import { useTimeMode } from "@/bl/modes/single/useTimeMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createTimeMode = (
	x: number,
	seconds: number,
	attributesCount = 4,
	harder?: {
		timePenalty: number;
		scorePenalty: number;
		maxMistakes: number;
	},
	storageKey?: string
) => {
	const useTimeModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useTimeMode(
			onGameEnd,
			deckGenerator,
			replacer,
			seconds,
			harder,
			storageKey
		);
	};

	return useTimeModeX;
};
