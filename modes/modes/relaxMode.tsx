import { useRelaxMode } from "@/bl/modes/single/useRelaxMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createRelaxMode = (x: number, attributesCount = 4) => {
	const useRelaxModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useRelaxMode(onGameEnd, deckGenerator, replacer);
	};

	return useRelaxModeX;
};
