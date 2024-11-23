import { Nullable } from "@/extra-types/utils/extra";
import { Supplier } from "@/extra-types/utils/functions";
import { Modes } from "@/modes/modes";
import { Medal } from "@/types/medal";
import { getData, StorageKey } from "@/utils/storage";
import { ImageURISource } from "react-native";

export type ModeConfig = {
	title: string;
	mode: Modes;
	Icon: ImageURISource;
	getMedal?: Supplier<Promise<Nullable<Medal>>>;
};

export const getMedalByWinsAmount =
	(key: StorageKey, thresholds: number[]) => async () => {
		const wins = +(await getData(key, String(0)));
		return wins >= thresholds[2]
			? Medal.gold
			: wins >= thresholds[1]
				? Medal.silver
				: wins >= thresholds[0]
					? Medal.bronze
					: null;
	};

// These are actually the same, but it feels right.
export const getMedalByHighScore = getMedalByWinsAmount;

export const getMedalByLowScore =
	(key: StorageKey, thresholds: number[]) => async () => {
		const best = +(await getData(key, String(Infinity)));
		return best <= thresholds[2]
			? Medal.gold
			: best <= thresholds[1]
				? Medal.silver
				: best <= thresholds[0]
					? Medal.bronze
					: null;
	};

export const modesConfig: ModeConfig[] = [
	{
		title: "FILLER",
		mode: "oneMinute",
		Icon: require("@/assets/images/mode-icons/relax.png"),
	},
	{
		title: "1-Minute",
		mode: "oneMinute",
		Icon: require("@/assets/images/mode-icons/1-minute.png"),
		getMedal: getMedalByHighScore(StorageKey.oneMinute, [8, 12, 16]),
	},
	{
		title: "6-Pack",
		mode: "sixPack",
		Icon: require("@/assets/images/mode-icons/loupe.png"),
		getMedal: getMedalByWinsAmount(StorageKey.sixPack, [100, 300, 500]),
	},
	{
		title: "8-Pack",
		mode: "eightPack",
		Icon: require("@/assets/images/mode-icons/8-ball.png"),
		getMedal: async () => {
			const wins = +(await getData(StorageKey.eightPack, String(0)));
			return wins >= 500
				? Medal.gold
				: wins >= 300
					? Medal.silver
					: wins >= 100
						? Medal.bronze
						: null;
		},
	},
	{
		title: "High-5",
		mode: "highFive",
		Icon: require("@/assets/images/mode-icons/high-5.png"),
		getMedal: getMedalByLowScore(StorageKey.highFive, [16, 12, 8]),
	},
	{
		title: "Drain",
		mode: "drain",
		Icon: require("@/assets/images/mode-icons/drain.png"),
		getMedal: getMedalByWinsAmount(StorageKey.drain, [100, 300, 500]),
	},
	{
		title: "Survival",
		mode: "survival",
		Icon: require("@/assets/images/mode-icons/survival.png"),
		getMedal: getMedalByHighScore(StorageKey.survival, [10, 20, 30]),
	},
	{
		title: "Disco",
		mode: "disco",
		Icon: require("@/assets/images/mode-icons/disco.png"),
		getMedal: getMedalByHighScore(StorageKey.disco, [8, 12, 16]),
	},
	{
		title: "Speed",
		mode: "speed",
		Icon: require("@/assets/images/mode-icons/speed.png"),
		getMedal: getMedalByWinsAmount(StorageKey.speed, [50, 150, 300]),
	},
	{
		title: "Levels",
		mode: "levels",
		Icon: require("@/assets/images/mode-icons/levels.png"),
		getMedal: getMedalByWinsAmount(StorageKey.levels, [10, 20, 30]),
	},

	{
		title: "Mania",
		mode: "mania",
		Icon: require("@/assets/images/mode-icons/mania.png"),
		getMedal: getMedalByWinsAmount(StorageKey.mania, [50, 150, 300]),
	},
	{
		title: "Expert",
		mode: "expert",
		Icon: require("@/assets/images/mode-icons/expert.png"),
		getMedal: getMedalByHighScore(StorageKey.expert, [5, 8, 10]),
	},
	{
		title: "Relax",
		mode: "relax",
		Icon: require("@/assets/images/mode-icons/ying-yang.png"),
		getMedal: getMedalByWinsAmount(
			StorageKey.totalSetsFound,
			[1000, 2500, 5000]
		),
	},
];
