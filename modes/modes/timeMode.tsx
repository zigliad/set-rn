import { useTimeMode } from "@/bl/modes/single/useTimeMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { Mode } from "@/modes/modeTypes";

export const createTimeMode = (
	x: number,
	seconds: number,
	attributesCount = 4,
	storageKey?: string
) => {
	const useTimeModeX = () => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useTimeMode(deckGenerator, replacer, seconds, storageKey);
	};

	return useTimeModeX;
};
