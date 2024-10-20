import { Supplier } from "@/extra-types/utils/functions";
import { createDiscoMode } from "@/modes/modes/discoMode";
import { createRaceMode } from "@/modes/modes/raceMode";
import { createRelaxMode } from "@/modes/modes/relaxMode";
import { createStaticMode } from "@/modes/modes/staticMode";
import { createTimeMode } from "@/modes/modes/timeMode";
import { Mode } from "@/modes/modeTypes";
import { StorageKey } from "@/utils/storage";

export type Modes =
	| "time60"
	| "time60Attributes5"
	| "static6"
	| "static8"
	| "race5"
	| "disco60"
	| "relax"
	| "relaxHard";

export const modes: Record<Modes, Supplier<Mode>> = {
	time60: createTimeMode(4, 60, 4, StorageKey.time60),
	time60Attributes5: createTimeMode(4, 60, 5),
	static6: createStaticMode(6, 8, 4, 3, StorageKey.static6),
	static8: createStaticMode(8, 8, 4, 3, StorageKey.static6),
	race5: createRaceMode(5, 30, StorageKey.race5),
	disco60: createDiscoMode(4, 60, 5, 4, StorageKey.disco60),
	relax: createRelaxMode(4),
	relaxHard: createRelaxMode(2, 5),
};
