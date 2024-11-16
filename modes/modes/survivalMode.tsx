import { useSurvivalMode } from "@/bl/modes/single/useSurvivalMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createSurvivalMode = (
	x: number,
	seconds: number,
	timeBonus: number,
	timePenalty: number,
	attributesCount = 4,
	storageKey?: string
) => {
	const useSurvivalModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useSurvivalMode(
			onGameEnd,
			deckGenerator,
			replacer,
			seconds,
			timeBonus,
			timePenalty,
			storageKey
		);
	};

	return useSurvivalModeX;
};
