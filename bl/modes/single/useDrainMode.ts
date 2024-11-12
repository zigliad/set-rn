import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback, useMemo, useState } from "react";

export const useDrainMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	storageKey?: string
) => {
	const {
		gameResult,
		gameEnded,
		deck,
		brain,
		endGame: baseEndGame,
		newGame: baseNewGame,
		checkSet: baseCheckSet,
	} = useSinglePlayerMode(onGameEnd, deckGenerator, storageKey);

	const [score, setScore] = useState(0);

	const goal = useMemo(() => deck.size / deck.brain.options, [deck]);

	const newGame = () => {
		baseNewGame();
		setScore(0);
	};

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

	const checkSet = async (indexes: number[]) => {
		const result = baseCheckSet(indexes);
		if (result.isSet) {
			replacer.replace(indexes, deck);
			const newScore = score + 1;
			setScore(newScore);
			if (newScore === goal) await endGame(GameResult.win);
			else {
				replacer.replace(indexes, deck);
				const newSetsCount = deck.countSets();
				if (newSetsCount === 0) await endGame(GameResult.lose);
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
		rules: `With the right moves, ${goal} sets can be formed. Find them, but be careful and choose wisely.`,
		title: `${score} / ${goal} sets found`,
		endgameTitle: gameResult === GameResult.win ? "You Won" : "You Lose",
		endgameContent:
			gameResult === GameResult.win
				? `You drained the cards!`
				: `No more sets`,
	};
};
