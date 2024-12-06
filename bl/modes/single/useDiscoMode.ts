import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useDiscoMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	seconds: number,
	propertyReplacer: Replacer,
	discoIntervalSeconds: number,
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

	// Disco effect: replace properties on interval
	useInterval(
		useCallback(() => {
			propertyReplacer.replace(
				Array.from({ length: deck.size }, (_, index) => index),
				deck
			);
		}, [deck, propertyReplacer]),
		gameEnded ? null : discoIntervalSeconds * 1000
	);

	// Start a new game
	const newGame = useCallback(() => {
		baseNewGame();
		resetTime();
		resetScore();
	}, [baseNewGame, resetTime, resetScore]);

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

	// Countdown timer
	useInterval(
		useCallback(async () => {
			if (timeLeft === 1) {
				await endGame();
			}
			decTime();
		}, [timeLeft, endGame, decTime]),
		gameEnded ? null : 1000
	);

	// Check if a set is valid
	const checkSet = useCallback(
		async (indexes: number[]) => {
			const result = baseCheckSet(indexes);
			if (result.isSet) {
				incScore();
				replacer.replace(indexes, deck);
			}

			return result;
		},
		[baseCheckSet, deck, incScore, replacer]
	);

	return {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame,
		checkSet,
		rules: `Find as many sets as you can in ${seconds} seconds while colors are changing every ${discoIntervalSeconds} seconds!`,
		title: `${timeLeft} seconds left / ${score}`,
		endgameTitle: "Time's Up!",
		endgameContent: `Your found ${score} sets`,
	};
};
