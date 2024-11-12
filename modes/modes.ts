import { AsyncAction1, Function } from "@/extra-types/utils/functions";
import { createDiscoMode } from "@/modes/modes/discoMode";
import { createDrainMode } from "@/modes/modes/drainMode";
import { createRaceMode } from "@/modes/modes/raceMode";
import { createRelaxMode } from "@/modes/modes/relaxMode";
import { createSpeedMode } from "@/modes/modes/speedMode";
import { createStaticMode } from "@/modes/modes/staticMode";
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
	| "relaxHard"
	| "drain"
	| "speed10_5";

export const modes: Record<Modes, Function<onGameEndCallback, Mode>> = {
	time60: createTimeMode(4, 60, 4, StorageKey.time60),
	time60Attributes5: createTimeMode(4, 60, 5),
	static6: createStaticMode(6, 8, 4, 3, StorageKey.static6),
	static8: createStaticMode(8, 8, 4, 3, StorageKey.static8),
	race5: createRaceMode(5, 300, false, StorageKey.race5),
	disco60: createDiscoMode(4, 60, 5, 4, StorageKey.disco60),
	relax: createRelaxMode(4),
	relaxHard: createRelaxMode(2, 5),
	drain: createDrainMode(4, 6, 4, 3, StorageKey.drain),
	speed10_5: createSpeedMode(4, 10, 5, 4, StorageKey.speed10_5),
	race3_12: createRaceMode(3, 12, true, StorageKey.race3_12),
};
