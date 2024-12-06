import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { storeData } from "@/utils/storage";
import { useCallback, useState } from "react";

export const useSinglePlayerMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	storageKey?: string
) => {
	const [gameEnded, setGameEnded] = useState(false);
	const [gameResult, setGameResult] = useState<GameResult>();
	const [deck, setDeck] = useState(deckGenerator.generate());

	const newGame = useCallback(() => {
		setGameEnded(false);
		setGameResult(undefined);
		setDeck(deckGenerator.generate());
	}, [deckGenerator]);

	const checkSet = useCallback(
		(indexes: number[]) => {
			const falsyResult = { isSet: false, set: undefined };

			if (gameEnded) return falsyResult;

			let cards = indexes
				.map((i) => deck.cards[i])
				.filter((c) => c !== null);
			if (deck.brain.isSet(cards)) {
				return { isSet: true, set: cards };
			}

			return falsyResult;
		},
		[gameEnded, deck]
	);

	const endGame = useCallback(
		async (result?: GameResult, scoreToSave?: string | number) => {
			setGameEnded(true);
			setGameResult(result);
			onGameEnd(result);
			if (storageKey && scoreToSave)
				await storeData(storageKey, scoreToSave);
		},
		[storageKey, onGameEnd]
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
