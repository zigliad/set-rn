import { AsyncAction1, Function } from "@/extra-types/utils/functions";
import { createDiscoMode } from "@/modes/modes/discoMode";
import { createRaceMode } from "@/modes/modes/raceMode";
import { createRelaxMode } from "@/modes/modes/relaxMode";
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
	| "disco60"
	| "relax"
	| "relaxHard";

export const modes: Record<Modes, Function<onGameEndCallback, Mode>> = {
	time60: (onGameEnd: onGameEndCallback) =>
		createTimeMode(onGameEnd, 4, 60, 4, StorageKey.time60)(),
	time60Attributes5: (onGameEnd: onGameEndCallback) =>
		createTimeMode(onGameEnd, 4, 60, 5)(),
	static6: (onGameEnd: onGameEndCallback) =>
		createStaticMode(onGameEnd, 6, 8, 4, 3, StorageKey.static6)(),
	static8: (onGameEnd: onGameEndCallback) =>
		createStaticMode(onGameEnd, 8, 8, 4, 3, StorageKey.static6)(),
	race5: (onGameEnd: onGameEndCallback) =>
		createRaceMode(onGameEnd, 5, 30, StorageKey.race5)(),
	disco60: (onGameEnd: onGameEndCallback) =>
		createDiscoMode(onGameEnd, 4, 60, 5, 4, StorageKey.disco60)(),
	relax: (onGameEnd: onGameEndCallback) => createRelaxMode(onGameEnd, 4)(),
	relaxHard: (onGameEnd: onGameEndCallback) =>
		createRelaxMode(onGameEnd, 2, 5)(),
};
