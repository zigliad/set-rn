import { AsyncAction1, Function } from "@/extra-types/utils/functions";
import { createDiscoMode } from "@/modes/modes/discoMode";
import { createDrainMode } from "@/modes/modes/drainMode";
import { createLevelsMode } from "@/modes/modes/levelsMode";
import { createRaceMode } from "@/modes/modes/raceMode";
import { createRelaxMode } from "@/modes/modes/relaxMode";
import { createStaticMode } from "@/modes/modes/staticMode";
import { createSurvivalMode } from "@/modes/modes/survivalMode";
import { createTimeMode } from "@/modes/modes/timeMode";
import { GameResult, Mode } from "@/modes/modeTypes";
import { StorageKey } from "@/utils/storage";

export type onGameEndCallback = AsyncAction1<GameResult | undefined>;

export type Modes =
	| "oneMinute"
	| "sixPack"
	| "eightPack"
	| "highFive"
	| "drain"
	| "survival"
	| "disco"
	| "speed"
	| "levels"
	| "mania"
	| "expert"
	| "relax";

export const modes: Record<Modes, Function<onGameEndCallback, Mode>> = {
	oneMinute: createTimeMode(4, 60, 4, undefined, StorageKey.oneMinute),
	sixPack: createStaticMode(6, 8, 4, 3, StorageKey.sixPack),
	eightPack: createStaticMode(8, 8, 4, 3, StorageKey.eightPack),
	highFive: createRaceMode(5, 300, false, 4, 4, StorageKey.highFive),
	drain: createDrainMode(4, 6, 4, 3, StorageKey.drain),
	survival: createSurvivalMode(4, 10, 5, 3, 4, StorageKey.survival),
	disco: createDiscoMode(4, 60, 5, 4, StorageKey.disco),
	speed: createRaceMode(3, 12, true, 4, 4, StorageKey.speed),
	levels: createLevelsMode(5, StorageKey.levels),
	mania: createRaceMode(10, 20, true, 10, 3, StorageKey.mania),
	expert: createTimeMode(
		2,
		60,
		5,
		{
			scorePenalty: 1,
			timePenalty: 1,
			maxMistakes: 2,
		},
		StorageKey.expert
	),
	relax: createRelaxMode(6),
};
