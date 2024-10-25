import { useRaceMode } from "@/bl/modes/single/useRaceMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createRaceMode = (
	goal: number,
	maxTime: number,
	storageKey?: string
) => {
	const useRaceModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({});
		return useRaceMode(
			onGameEnd,
			deckGenerator,
			replacer,
			goal,
			maxTime,
			storageKey
		);
	};

	return useRaceModeX;
};
