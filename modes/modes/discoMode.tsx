import { useDiscoMode } from "@/bl/modes/single/useDiscoMode";
import PropertyReplacer from "@/bl/replacer/PropertyReplacer";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createDiscoMode = (
	x: number,
	seconds: number,
	discoIntervalSeconds: number = 5,
	attributesCount = 4,
	storageKey?: string
) => {
	const useDiscoModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useDiscoMode(
			onGameEnd,
			deckGenerator,
			replacer,
			seconds,
			new PropertyReplacer(x, 3),
			discoIntervalSeconds,
			storageKey
		);
	};

	return useDiscoModeX;
};
