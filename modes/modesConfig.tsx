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
		getMedal: async () => {
			const best = +(await getData(StorageKey.oneMinute, "0"));
			return best >= 16
				? Medal.gold
				: best >= 12
					? Medal.silver
					: best >= 8
						? Medal.bronze
						: null;
		},
	},
	{
		title: "6-Pack",
		mode: "sixPack",
		Icon: require("@/assets/images/mode-icons/loupe.png"),
		getMedal: async () => {
			const wins = +(await getData(StorageKey.sixPack, String(0)));
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
		getMedal: async () => {
			const best = +(await getData(
				StorageKey.highFive,
				String(Infinity)
			));
			return best <= 8
				? Medal.gold
				: best <= 12
					? Medal.silver
					: best <= 16
						? Medal.bronze
						: null;
		},
	},
	{
		title: "Drain",
		mode: "drain",
		Icon: require("@/assets/images/mode-icons/drain.png"),
		getMedal: async () => {
			const wins = +(await getData(StorageKey.drain, String(0)));
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
		title: "Survival",
		mode: "survival",
		Icon: require("@/assets/images/mode-icons/survival.png"),
		getMedal: async () => {
			const best = +(await getData(StorageKey.survival, "0"));
			return best >= 20
				? Medal.gold
				: best >= 10
					? Medal.silver
					: best >= 5
						? Medal.bronze
						: null;
		},
	},
	{
		title: "Disco",
		mode: "disco",
		Icon: require("@/assets/images/mode-icons/disco.png"),
		getMedal: async () => {
			const best = +(await getData(StorageKey.disco, "0"));
			return best >= 16
				? Medal.gold
				: best >= 12
					? Medal.silver
					: best >= 8
						? Medal.bronze
						: null;
		},
	},
	{
		title: "Speed",
		mode: "speed",
		Icon: require("@/assets/images/mode-icons/speed.png"),
		getMedal: async () => {
			const wins = +(await getData(StorageKey.speed, String(0)));
			return wins >= 300
				? Medal.gold
				: wins >= 150
					? Medal.silver
					: wins >= 50
						? Medal.bronze
						: null;
		},
	},
	{
		title: "Levels",
		mode: "levels",
		Icon: require("@/assets/images/mode-icons/levels.png"),
		getMedal: async () => {
			const level = +(await getData(StorageKey.levels, String(0)));
			return level >= 30
				? Medal.gold
				: level >= 15
					? Medal.silver
					: level >= 5
						? Medal.bronze
						: null;
		},
	},

	{
		title: "Mania",
		mode: "mania",
		Icon: require("@/assets/images/mode-icons/mania.png"),
	},
	{
		title: "Expert",
		mode: "expert",
		Icon: require("@/assets/images/mode-icons/expert.png"),
	},
	{
		title: "Relax",
		mode: "relax",
		Icon: require("@/assets/images/mode-icons/ying-yang.png"),
		getMedal: async () => {
			const best = +(await getData(StorageKey.totalSetsFound, "0"));
			return best >= 5000
				? Medal.gold
				: best >= 900
					? Medal.silver
					: best >= 500
						? Medal.bronze
						: null;
		},
	},
];
