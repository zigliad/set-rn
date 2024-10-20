import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useRaceMode = (
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	goal: number,
	maxTime: number = 30,
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
	} = useSinglePlayerMode(deckGenerator);

	const [time, { dec: decTime, reset: resetTime, set: setTime }] =
		useCounter(maxTime);
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);

	const newGame = () => {
		baseNewGame();
		resetTime();
		resetScore();
	};

	const endGame = useCallback(
		async (result?: GameResult) => {
			let newBest;
			if (result !== GameResult.lose) {
				const best = await getData(storageKey);
				newBest = time < +(best ?? Infinity) ? time : undefined;
			}
			baseEndGame(result, newBest);
		},
		[baseEndGame, storageKey]
	);

	useInterval(
		async () => {
			if (time <= 0) {
				setTime(0);
				await endGame(GameResult.lose);
			} else {
				decTime(0.1);
			}
		},
		gameEnded ? null : 100
	);

	const checkSet = async (indexes: number[]) => {
		const result = baseCheckSet(indexes);
		if (result.isSet) {
			if (score + 1 === goal) {
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
		rules: `Find ${goal} sets before the clock strikes zero!`,
		title: `${score} / ${goal} sets, ${time.toFixed(1)}`,
		endgameTitle: gameResult === GameResult.win ? "You Won" : "You Lose",
		endgameContent:
			gameResult === GameResult.win
				? `${goal} sets in ${(maxTime - time).toFixed(2)} seconds!`
				: `You found ${score}/${goal} sets in ${maxTime} seconds`,
		name: "Race Mode",
	};
};
