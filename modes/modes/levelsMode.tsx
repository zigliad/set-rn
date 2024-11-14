import { useLevelsMode } from "@/bl/modes/single/useLevelsMode";
import { useInitGameParts } from "@/hooks/useInitGameParts";
import { onGameEndCallback } from "@/modes/modes";
import { StorageKey } from "@/utils/storage";

export const createLevelsMode = (levelTime: number, storageKey: StorageKey) => {
	const useLevelsModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useInitGameParts({});
		return useLevelsMode(
			onGameEnd,
			deckGenerator,
			replacer,
			levelTime,
			storageKey
		);
	};

	return useLevelsModeX;
};
