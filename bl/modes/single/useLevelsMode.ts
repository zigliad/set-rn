import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { useStorageState } from "@/hooks/useStorageState";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { StorageKey } from "@/utils/storage";
import { useCallback, useState } from "react";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useLevelsMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	levelTime: number = 5,
	storageKey: StorageKey
) => {
	const {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame: baseNewGame,
		endGame: baseEndGame,
		checkSet: baseCheckSet,
	} = useSinglePlayerMode(onGameEnd, deckGenerator, storageKey);

	const [time, { inc: incTime, set: setTime }] = useCounter(0);

	const onLevelLoaded = useCallback(
		(value: string | number) => {
			setTime(+value * levelTime);
		},
		[levelTime]
	);

	const [level, setLevel] = useStorageState(
		storageKey,
		String(1),
		onLevelLoaded
	);

	const gameTime = +(level ?? 1) * levelTime;
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);
	const [winText, setWinText] = useState("");

	const newGame = async () => {
		baseNewGame();
		setTime(gameTime);
		resetScore();
	};

	const endGame = useCallback(
		async (result?: GameResult) => {
			let newLevel;
			if (result !== GameResult.lose) {
				setWinText(
					`You found ${level} sets in ${gameTime - time} seconds!`
				);
				newLevel = +level + 1;
				setLevel(String(newLevel));
			}
			baseEndGame(result, newLevel);
		},
		[baseEndGame, level, time, gameTime]
	);

	useInterval(
		async () => {
			if (time <= 1) {
				await endGame(GameResult.lose);
			} else {
				incTime(-1);
			}
		},
		gameEnded ? null : 1000
	);

	const checkSet = async (indexes: number[]) => {
		const result = baseCheckSet(indexes);
		if (result.isSet) {
			if (score + 1 === +level) {
				await endGame(GameResult.win);
			}
			incScore();
			replacer.replace(indexes, deck);
		}

		return result;
	};

	return {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame,
		checkSet,
		rules: `Level, goal: ${level}.\nTime: ${gameTime}.`,
		title: `${score} / ${level} sets, ${time}`,
		endgameTitle: gameResult === GameResult.win ? "You Won" : "You Lose",
		endgameContent:
			gameResult === GameResult.win ? winText : "Better luck next time!",
	};
};
