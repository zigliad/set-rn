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
	| "time60"
	| "time60Attributes5"
	| "static6"
	| "static8"
	| "race5"
	| "race3_12"
	| "disco60"
	| "relax"
	| "expert"
	| "mania"
	| "drain"
	| "speed10_5"
	| "levels";

export const modes: Record<Modes, Function<onGameEndCallback, Mode>> = {
	time60: createTimeMode(4, 60, 4, undefined, StorageKey.time60),
	time60Attributes5: createTimeMode(4, 60, 5),
	static6: createStaticMode(6, 8, 4, 3, StorageKey.static6),
	static8: createStaticMode(8, 8, 4, 3, StorageKey.static8),
	race5: createRaceMode(5, 300, false, 4, 4, StorageKey.race5),
	disco60: createDiscoMode(4, 60, 5, 4, StorageKey.disco60),
	relax: createRelaxMode(4),
	expert: createTimeMode(
		2,
		60,
		5,
		{
			scorePenalty: 1,
			timePenalty: 5,
			maxMistakes: 3,
		},
		StorageKey.time60
	),
	mania: createRaceMode(10, 25, true, 10, 3, StorageKey.race3_12),
	drain: createDrainMode(4, 6, 4, 3, StorageKey.drain),
	speed10_5: createSurvivalMode(4, 10, 5, 3, 4, StorageKey.speed10_5),
	race3_12: createRaceMode(3, 12, true, 4, 4, StorageKey.race3_12),
	levels: createLevelsMode(5, StorageKey.levels),
};
