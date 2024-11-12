import { useSpeedMode } from "@/bl/modes/single/useSpeedMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createSpeedMode = (
	x: number,
	seconds: number,
	timeBonus: number,
	attributesCount = 4,
	storageKey?: string
) => {
	const useSpeedModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useSpeedMode(
			onGameEnd,
			deckGenerator,
			replacer,
			seconds,
			timeBonus,
			storageKey
		);
	};

	return useSpeedModeX;
};
