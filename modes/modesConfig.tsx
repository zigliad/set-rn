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
		mode: "time60",
		Icon: require("@/assets/images/mode-icons/relax.png"),
	},
	{
		title: "1-Minute",
		mode: "time60",
		Icon: require("@/assets/images/mode-icons/1-minute.png"),
		getMedal: async () => {
			const best = +(await getData(StorageKey.time60, "0"));
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
		mode: "static6",
		Icon: require("@/assets/images/mode-icons/loupe.png"),
		getMedal: async () => {
			const wins = +(await getData(StorageKey.static6, String(0)));
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
		mode: "static8",
		Icon: require("@/assets/images/mode-icons/8-ball.png"),
		getMedal: async () => {
			const wins = +(await getData(StorageKey.static8, String(0)));
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
		mode: "race5",
		Icon: require("@/assets/images/mode-icons/high-5.png"),
		getMedal: async () => {
			const best = +(await getData(StorageKey.race5, String(Infinity)));
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
		title: "Disco",
		mode: "disco60",
		Icon: require("@/assets/images/mode-icons/disco.png"),
		getMedal: async () => {
			const best = +(await getData(StorageKey.disco60, "0"));
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
	// {
	// 	title: "Relax: Harder",
	// 	mode: "relaxHard",
	// 	// Icon: LocalBarRoundedIcon,
	// },
];
