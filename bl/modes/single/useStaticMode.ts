import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useSet from "react-use/lib/useSet";

export const useStaticMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	totalSets: number,
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

	const [sets, { add, has, reset }] = useSet(new Set<string>());

	// Start a new game
	const newGame = useCallback(() => {
		baseNewGame();
		reset();
	}, [baseNewGame, reset]);

	// End the game
	const endGame = useCallback(
		async (result?: GameResult) => {
			let wins;
			if (storageKey) {
				const score = await getData(storageKey, String(0));
				wins = +score + 1;
			}
			baseEndGame(result, wins);
		},
		[baseEndGame, storageKey]
	);

	// Check if a set is valid
	const checkSet = useCallback(
		async (indexes: number[]) => {
			const result = baseCheckSet(indexes);
			if (result.set) {
				const setString = result.set
					.sort((a, b) => a.toString().localeCompare(b.toString()))
					.toString();

				if (!has(setString)) {
					add(setString);

					if (sets.size + 1 === totalSets) {
						await endGame(GameResult.win);
					}
				}
			}

			return result;
		},
		[baseCheckSet, add, has, sets.size, totalSets, endGame]
	);

	return {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame,
		checkSet,
		rules: `There are many sets here.\nYour job is to find ${totalSets} of them.`,
		title: `${sets.size} / ${totalSets} sets found`,
		endgameTitle: `You Won`,
		endgameContent: `You found ${totalSets} sets`,
	};
};
