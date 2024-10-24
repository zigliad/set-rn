import { useTimeMode } from "@/bl/modes/single/useTimeMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createTimeMode = (
	onGameEnd: onGameEndCallback,
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
		return useTimeMode(
			onGameEnd,
			deckGenerator,
			replacer,
			seconds,
			storageKey
		);
	};

	return useTimeModeX;
};
