import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useTimeMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	seconds: number,
	storageKey?: string
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

	const [timeLeft, { dec: decTime, reset: resetTime }] = useCounter(seconds);
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);

	const newGame = () => {
		baseNewGame();
		resetTime();
		resetScore();
	};

	const endGame = useCallback(
		async (result?: GameResult) => {
			const best = await getData(storageKey);
			baseEndGame(result, score > +(best ?? 0) ? score : undefined);
		},
		[baseEndGame, storageKey, score]
	);

	useInterval(
		async () => {
			if (timeLeft === 1) {
				await endGame();
			}
			decTime();
		},
		gameEnded ? null : 1000
	);

	const checkSet = async (indexes: number[]) => {
		const result = baseCheckSet(indexes);
		if (result.isSet) {
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
		rules: `Find as many sets as you can in ${seconds} seconds!`,
		title: `${timeLeft} seconds left / ${score}`,
		endgameTitle: `Time's up!`,
		endgameContent: `You found ${score} sets`,
		name: "Time Mode",
	};
};
