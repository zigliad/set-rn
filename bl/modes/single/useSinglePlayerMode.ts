import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { GameResult } from "@/modes/types/types";
import { storeData } from "@/utils/storage";
import { useCallback, useState } from "react";

export const useSinglePlayerMode = (
	deckGenerator: DeckGenerator,
	storageKey?: string
) => {
	const [gameEnded, setGameEnded] = useState(false);
	const [gameResult, setGameResult] = useState<GameResult>();
	const [deck, setDeck] = useState(deckGenerator.generate());

	const newGame = () => {
		setGameEnded(false);
		setGameResult(undefined);
		setDeck(deckGenerator.generate());
	};

	const checkSet = (indexes: number[]) => {
		const falsyResult = { isSet: false, set: undefined };

		if (gameEnded) return falsyResult;

		let cards = indexes.map((i) => deck.cards[i]);
		if (deck.brain.isSet(cards)) {
			return { isSet: true, set: cards };
		}

		return falsyResult;
	};

	const endGame = useCallback(
		async (result?: GameResult, scoreToSave?: string | number) => {
			setGameEnded(true);
			setGameResult(result);
			if (storageKey && scoreToSave)
				await storeData(storageKey, scoreToSave);
		},
		[storageKey]
	);

	return {
		gameEnded,
		gameResult,
		deck,
		brain: deck.brain,
		newGame,
		endGame,
		checkSet,
	};
};
