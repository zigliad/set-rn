import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useSurvivalMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	seconds: number,
	timeBonus: number,
	timePenalty: number,
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

	const [timeLeft, { dec: decTime, reset: resetTime, set: setTime }] =
		useCounter(seconds);
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);

	const newGame = () => {
		baseNewGame();
		resetTime();
		resetScore();
	};

	const endGame = useCallback(
		async (result?: GameResult) => {
			let newBest;
			if (storageKey) {
				const best = await getData(storageKey, String(0));
				newBest = score > +best ? score : undefined;
			}
			baseEndGame(result, newBest);
		},
		[baseEndGame, storageKey, score]
	);

	useInterval(
		async () => {
			if (timeLeft <= 1) {
				await endGame(GameResult.lose);
				setTime(0);
			} else decTime();
		},
		gameEnded ? null : 1000
	);

	const checkSet = async (indexes: number[]) => {
		const result = baseCheckSet(indexes);
		if (result.isSet) {
			incScore();
			setTime((t) => Math.min(10, t + timeBonus));
			replacer.replace(indexes, deck);
		} else if (timeLeft <= timePenalty) {
			await endGame(GameResult.lose);
			setTime(0);
		} else {
			setTime((t) => Math.max(0, t - timePenalty));
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
		rules: `You earn ${timeBonus} seconds for each set you find, you lose ${timePenalty} seconds for each wrong attempt, ${seconds} is the limit. Don't get to 0.`,
		title: `${timeLeft} seconds left / ${score}`,
		endgameTitle: `Time's Up!`,
		endgameContent: `You found ${score} sets`,
	};
};