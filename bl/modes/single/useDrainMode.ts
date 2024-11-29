import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { onGameEndCallback } from "@/modes/modes";
import { GameResult } from "@/modes/modeTypes";
import { getData } from "@/utils/storage";
import { useCallback, useMemo, useState } from "react";
import useInterval from "react-use/lib/useInterval";

export const useDrainMode = (
	onGameEnd: onGameEndCallback,
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	seconds: number,
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
	const [timeLeft, setTimeLeft] = useState(seconds);
	const [startTimer, setStartTimer] = useState(false);

	const goal = useMemo(() => deck.size / deck.brain.options, [deck]);

	useInterval(
		async () => {
			if (timeLeft <= 1) {
				await endGame(GameResult.lose);
				setTimeLeft(0);
			} else {
				setTimeLeft((t) => t - 1);
			}
		},
		!gameEnded && startTimer ? 1000 : null
	);

	const newGame = () => {
		baseNewGame();
		setScore(0);
		setTimeLeft(seconds);
		setStartTimer(false);
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
			setStartTimer(true);
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
		rules: `With the right moves, ${goal} sets can be formed. Once you find the first set, you'll have ${seconds} seconds to find the rest. Plan carefully!`,
		title: `${score} / ${goal} sets, ${timeLeft}`,
		endgameTitle:
			gameResult === GameResult.win
				? "You Won"
				: timeLeft === 0
					? "Time's Up!"
					: "You Lose",
		endgameContent:
			gameResult === GameResult.win
				? `You drained the cards!`
				: timeLeft === 0
					? `Better luck next time!`
					: `No more sets`,
	};
};
