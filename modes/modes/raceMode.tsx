import { useRaceMode } from "@/bl/modes/single/useRaceMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createRaceMode = (
	goal: number,
	maxTime: number,
	reverse: boolean,
	x: number = 4,
	attributesCount = 4,
	storageKey?: string
) => {
	const useRaceModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useRaceMode(
			onGameEnd,
			deckGenerator,
			replacer,
			goal,
			maxTime,
			reverse,
			storageKey
		);
	};

	return useRaceModeX;
};
