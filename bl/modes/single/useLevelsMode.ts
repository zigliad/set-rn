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
		[levelTime, setTime]
	);

	const [level, setLevel] = useStorageState(
		storageKey,
		String(1),
		onLevelLoaded
	);

	const gameTime = useCallback(
		() => +(level ?? 1) * levelTime,
		[level, levelTime]
	)();
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);
	const [winText, setWinText] = useState("");

	const newGame = useCallback(async () => {
		baseNewGame();
		setTime(gameTime);
		resetScore();
	}, [baseNewGame, gameTime, setTime, resetScore]);

	const endGame = useCallback(
		async (result?: GameResult) => {
			let newLevel;
			if (result !== GameResult.lose) {
				newLevel = +level + 1;
				setWinText(
					`You've completed level ${level}!\nNext level: ${newLevel} sets, ${newLevel * levelTime} seconds.`
				);
				setLevel(String(newLevel));
			}
			baseEndGame(result, newLevel);
		},
		[baseEndGame, level, time, gameTime, setLevel]
	);

	useInterval(
		useCallback(async () => {
			if (time <= 1) {
				await endGame(GameResult.lose);
			} else {
				incTime(-1);
			}
		}, [time, endGame, incTime]),
		gameEnded ? null : 1000
	);

	const checkSet = useCallback(
		async (indexes: number[]) => {
			const result = baseCheckSet(indexes);
			if (result.isSet) {
				if (score + 1 === +level) {
					await endGame(GameResult.win);
				}
				incScore();
				replacer.replace(indexes, deck);
			}

			return result;
		},
		[baseCheckSet, endGame, score, level, incScore, replacer, deck]
	);

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
