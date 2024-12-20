import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useRaceMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	goal: number,
	maxTime: number = 300,
	reverse = false,
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

	const [time, { inc: incTime, reset: resetTime, set: setTime }] = useCounter(
		reverse ? maxTime : 0
	);
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);

	const newGame = useCallback(() => {
		baseNewGame();
		resetTime();
		resetScore();
	}, [baseNewGame, resetTime, resetScore]);

	const endGame = useCallback(
		async (result?: GameResult) => {
			let newBest;
			if (result !== GameResult.lose && storageKey) {
				if (reverse) {
					const score = await getData(storageKey, String(0));
					newBest = +score + 1;
				} else {
					const best = await getData(storageKey, String(Infinity));
					newBest = time < +best ? time : undefined;
				}
			}
			baseEndGame(result, newBest);
		},
		[baseEndGame, storageKey, time, reverse]
	);

	useInterval(
		async () => {
			if (reverse ? time <= 1 : time >= maxTime) {
				await endGame(GameResult.lose);
				setTime(0);
			} else {
				incTime(reverse ? -1 : 1);
			}
		},
		gameEnded ? null : 1000
	);

	const checkSet = useCallback(
		async (indexes: number[]) => {
			const result = baseCheckSet(indexes);
			if (result.isSet) {
				if (score + 1 === goal) {
					await endGame(GameResult.win);
				}
				incScore();
				replacer.replace(indexes, deck);
			}

			return result;
		},
		[baseCheckSet, endGame, score, goal, incScore, replacer, deck]
	);

	return {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame,
		checkSet,
		rules: reverse
			? `Simply find ${goal} sets in ${maxTime} seconds!`
			: `Find ${goal} sets as fast as you can!`,
		title: `${score} / ${goal} sets, ${time.toFixed(0)}`,
		endgameTitle: gameResult === GameResult.win ? "You Won" : "You Lose",
		endgameContent:
			gameResult === GameResult.win
				? reverse
					? `You found ${goal} sets in ${(maxTime - time).toFixed(0)} seconds!`
					: `You found ${goal} sets in ${time} seconds!`
				: reverse
					? "Better luck next time!"
					: `You found ${score}/${goal} sets in ${maxTime} seconds`,
	};
};
