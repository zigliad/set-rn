import DeckGenerator from "@/bl/generators/deck/DeckGenerator";
import { useSinglePlayerMode } from "@/bl/modes/single/useSinglePlayerMode";
import Replacer from "@/bl/replacer/Replacer";
import { GameResult } from "@/modes/types/types";
import useCounter from "react-use/lib/useCounter";
import useInterval from "react-use/lib/useInterval";

export const useDiscoMode = (
	deckGenerator: DeckGenerator,
	replacer: Replacer,
	seconds: number,
	propertyReplacer: Replacer,
	discoIntervalSeconds: number
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

	const [timeLeft, { dec: decTime, reset: resetTime }] = useCounter(seconds);
	const [score, { inc: incScore, reset: resetScore }] = useCounter(0);

	useInterval(
		() => {
			if (timeLeft === 1) {
				setGameEnded(true);
				setGameResult(GameResult.win);
			}
			decTime();
		},
		gameEnded ? null : 1000
	);

	useInterval(
		() => {
			propertyReplacer.replace(
				Array.from({ length: deck.size }, (_, index) => index),
				deck
			);
		},
		gameEnded ? null : discoIntervalSeconds * 1000
	);

	const newGame = () => {
		baseNewGame();
		resetTime();
		resetScore();
	};

	const checkSet = (indexes: number[]) => {
		const [isSet] = baseCheckSet(indexes);
		if (isSet) {
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
		rules: `Find as many sets as you can in ${seconds} seconds. Disco? Colors are changing every ${discoIntervalSeconds} seconds!`,
		title: `Score: ${score} - ${timeLeft} seconds left`,
		endgameTitle: `Time's up!\nYour score is ${score}`,
		name: "Disco Mode",
	};
};
