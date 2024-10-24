import { useRelaxMode } from "@/bl/modes/single/useRelaxMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createRelaxMode = (
	onGameEnd: onGameEndCallback,
	x: number,
	attributesCount = 4
) => {
	const useRelaxModeX = () => {
		const { deckGenerator, replacer } = useInitGameParts({
			deckGeneratorMinSets: x,
			replacerMinSets: x,
			attributesCount,
		});
		return useRelaxMode(onGameEnd, deckGenerator, replacer);
	};

	return useRelaxModeX;
};
