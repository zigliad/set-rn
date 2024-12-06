import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback, useState } from "react";
import useInterval from "react-use/lib/useInterval";

export const useTimeMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	seconds: number,
	harder?: {
		timePenalty: number;
		scorePenalty: number;
		maxMistakes: number;
	},
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

	const [timeLeft, setTimeLeft] = useState(seconds);
	const [score, setScore] = useState(0);
	const [mistakes, setMistakes] = useState(0);

	// Start a new game
	const newGame = useCallback(() => {
		baseNewGame();
		setTimeLeft(seconds);
		setScore(0);
		setMistakes(0);
	}, [baseNewGame, seconds]);

	// End the game
	const endGame = useCallback(
		async (result?: GameResult) => {
			let newBest;
			if (storageKey) {
				const best = await getData(storageKey, "0");
				newBest = score > +best ? score : undefined;
			}
			baseEndGame(result, newBest);
		},
		[baseEndGame, storageKey, score]
	);

	// Timer logic
	useInterval(
		useCallback(async () => {
			if (timeLeft === 1) {
				await endGame(GameResult.lose);
				setTimeLeft(0);
			} else {
				setTimeLeft((t) => t - 1);
			}
		}, [timeLeft, endGame]),
		gameEnded ? null : 1000
	);

	// Check if a set is valid
	const checkSet = useCallback(
		async (indexes: number[]) => {
			const result = baseCheckSet(indexes);
			if (result.isSet) {
				setScore((s) => s + 1);
				replacer.replace(indexes, deck);
			} else if (harder) {
				if (mistakes + 1 === harder.maxMistakes) {
					await endGame(GameResult.lose);
				} else {
					setScore((s) => Math.max(0, s - harder.scorePenalty));
					setMistakes((m) => m + 1);
					setTimeLeft((t) => Math.max(0, t - harder.timePenalty));
				}
			}
			return result;
		},
		[baseCheckSet, deck, replacer, harder, mistakes, endGame]
	);

	return {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame,
		checkSet,
		rules: harder
			? `Find as many sets as you can in ${seconds} seconds! For each mistake you lose ${harder.scorePenalty} points and ${harder.timePenalty} seconds.\nMax mistakes: ${harder.maxMistakes}.`
			: `Find as many sets as you can in ${seconds} seconds!`,
		title: `${timeLeft} seconds left / ${score}`,
		endgameTitle:
			gameResult === GameResult.lose ? `You Lose` : `Time's Up!`,
		endgameContent:
			gameResult === GameResult.lose
				? `Better luck next time!`
				: `You found ${score} sets`,
	};
};
