import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import { GameResult } from "@/modes/types/types";
import { getData } from "@/utils/storage";
import { useCallback } from "react";
import useSet from "react-use/lib/useSet";

export const useStaticMode = (
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
	} = useSinglePlayerMode(deckGenerator, storageKey);

	const [sets, { add, has, reset }] = useSet(new Set<string>([]));

	const newGame = () => {
		baseNewGame();
		reset();
	};

	const endGame = useCallback(
		async (result?: GameResult) => {
			const score = await getData(storageKey);
			baseEndGame(result, +(score ?? 0) + 1);
		},
		[baseEndGame, storageKey]
	);

	const checkSet = async (indexes: number[]) => {
		const result = baseCheckSet(indexes);
		if (result.set) {
			const setString = result.set
				.sort((a, b) => a.toString().localeCompare(b.toString()))
				.toString();
			if (!has(setString)) {
				if (sets.size + 1 === totalSets) {
					await endGame(GameResult.win);
				}

				add(setString);
			}
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
		rules: `There are many sets here.\nYour job is to find ${totalSets} of them.`,
		title: `${sets.size} / ${totalSets} sets found`,
		endgameTitle: `You did it!\nYou are the best!`,
		name: "Static Mode",
	};
};
