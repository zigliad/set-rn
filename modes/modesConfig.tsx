import { Nullable } from "@/extra-types/utils/extra";
import { Supplier } from "@/extra-types/utils/functions";
import { Modes } from "@/modes/modes";
import { Medal } from "@/types/medal";
import { Price } from "@/types/price";
import { getData, StorageKey } from "@/utils/storage";
import { ImageURISource } from "react-native";

export const DEFAULT_MODE_PRICE: Price = { gems: 5 };

export type ModeConfig = {
	title: string;
	mode: Modes;
	Icon: ImageURISource;
	getMedal?: Supplier<Promise<Nullable<Medal>>>;
	price?: Price;
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
		Icon: require("@/assets/images/mode-icons/1-minute.png"),
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
		getMedal: getMedalByWinsAmount(StorageKey.sixPack, [50, 150, 300]),
	},
	{
		title: "High-5",
		mode: "highFive",
		Icon: require("@/assets/images/mode-icons/high-5.png"),
		getMedal: getMedalByLowScore(StorageKey.highFive, [24, 18, 12]),
	},
	{
		title: "8-Pack",
		mode: "eightPack",
		Icon: require("@/assets/images/mode-icons/8-ball.png"),
		getMedal: getMedalByWinsAmount(StorageKey.eightPack, [50, 150, 300]),
	},
	{
		title: "Drain",
		mode: "drain",
		Icon: require("@/assets/images/mode-icons/drain.png"),
		getMedal: getMedalByWinsAmount(StorageKey.drain, [50, 150, 300]),
		price: { gems: 7 },
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
		getMedal: getMedalByHighScore(StorageKey.disco, [6, 10, 14]),
		price: { gems: 7 },
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
		price: { gems: 10 },
	},
	{
		title: "Expert",
		mode: "expert",
		Icon: require("@/assets/images/mode-icons/expert.png"),
		getMedal: getMedalByHighScore(StorageKey.expert, [4, 6, 8]),
		price: { gems: 10 },
	},
	{
		title: "Zen",
		mode: "zen",
		Icon: require("@/assets/images/mode-icons/ying-yang.png"),
		getMedal: getMedalByWinsAmount(
			StorageKey.totalSetsFound,
			[1000, 2500, 5000]
		),
		price: { gems: 3 },
	},
];
