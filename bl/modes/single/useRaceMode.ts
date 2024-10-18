import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { GameResult } from "@/modes/types/types";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useRaceMode = (
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	goal: number,
	maxTime: number = 30
) => {
	const {
		gameEnded,
		setGameEnded,
		gameResult,
		setGameResult,
		deck,
		brain,
		newGame: baseNewGame,
		checkSet: baseCheckSet,
	} = useSinglePlayerMode(deckGenerator);

	const [time, { dec: decTime, reset: resetTime, set: setTime }] =
		useCounter(maxTime);
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);

	useInterval(
		() => {
			if (time <= 0) {
				setTime(0);
				setGameEnded(true);
				setGameResult(GameResult.lose);
			} else {
				decTime(0.1);
			}
		},
		gameEnded ? null : 100
	);

	const newGame = () => {
		baseNewGame();
		resetTime();
		resetScore();
	};

	const checkSet = (indexes: number[]) => {
		const [isSet] = baseCheckSet(indexes);
		if (isSet) {
			if (score + 1 === goal) {
				setGameEnded(true);
				setGameResult(GameResult.win);
			}
			incScore();
			replacer.replace(indexes, deck);
		}

		return isSet;
	};

	return {
		gameEnded,
		gameResult,
		deck,
		brain,
		newGame,
		checkSet,
		rules: `Find ${goal} sets before the clock strikes zero!`,
		title: `${score} / ${goal} sets, ${time.toFixed(1)}`,
		endgameTitle:
			gameResult === GameResult.win
				? `You did it!\n${goal} sets in ${(maxTime - time).toFixed(
						2
					)} seconds!`
				: "Better luck next time...",
		name: "Race Mode",
	};
};
