import { createDiscoMode } from "@/app/modes/modes/discoMode";
import { createRaceMode } from "@/app/modes/modes/raceMode";
import { createRelaxMode } from "@/app/modes/modes/relaxMode";
import { createStaticMode } from "@/app/modes/modes/staticMode";
import { createTimeMode } from "@/app/modes/modes/timeMode";
import { Mode } from "@/app/modes/types/types";
import { Supplier } from "@/extra-types/utils/functions";

export type Modes =
	| "time60"
	| "time60Attributes5"
	| "static6"
	| "race5"
	| "disco"
	| "relax"
	| "relaxHard";

export const modes: Record<Modes, Supplier<Mode>> = {
	time60: createTimeMode(4, 60),
	time60Attributes5: createTimeMode(4, 60, 5),
	static6: createStaticMode(6, 8),
	race5: createRaceMode(5, 30),
	disco: createDiscoMode(4, 60),
	relax: createRelaxMode(4),
	relaxHard: createRelaxMode(2, 5),
};
