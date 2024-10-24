import { useRaceMode } from "@/bl/modes/single/useRaceMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";

export const createRaceMode = (
	onGameEnd: onGameEndCallback,
	goal: number,
	maxTime: number,
	storageKey?: string
) => {
	const useRaceModeX = () => {
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
