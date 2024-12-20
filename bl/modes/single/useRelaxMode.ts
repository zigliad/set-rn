import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { useCallback, useState } from "react";

export const useRelaxMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer
) => {
	const {
		gameEnded,
		deck,
		brain,
		newGame: baseNewGame,
		checkSet: baseCheckSet,
	} = useSinglePlayerMode(onGameEnd, deckGenerator);

	const [availableSets, setAvailableSets] = useState(deck.countSets());

	const newGame = useCallback(() => {
		baseNewGame();
		setAvailableSets(deck.countSets());
	}, [baseNewGame, deck]);

	const checkSet = useCallback(
		async (indexes: number[]) => {
			const result = baseCheckSet(indexes);
			if (result.isSet) {
				replacer.replace(indexes, deck);
				setAvailableSets(deck.countSets());
			}

			return result;
		},
		[baseCheckSet, deck, replacer]
	);

	return {
		gameEnded,
		deck,
		brain,
		newGame,
		checkSet,
		rules: `There is no time nor score.\nJust find sets and relax.`,
		title: `${availableSets} sets available`,
		endgameTitle: `Wait, What?`,
		endgameContent: "Wait, What?",
	};
};
