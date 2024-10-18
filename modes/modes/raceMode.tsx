import { useRaceMode } from "@/bl/modes/single/useRaceMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";

export const createRaceMode = (
	goal: number,
	maxTime: number,
	storageKey?: string
) => {
	const useRaceModeX = () => {
		const { deckGenerator, replacer } = useInitGameParts({});
		return useRaceMode(deckGenerator, replacer, goal, maxTime, storageKey);
	};

	return useRaceModeX;
};
