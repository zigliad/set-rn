import { Modes } from "@/modes/modes";
import { ImageURISource } from "react-native";

export type ModeConfig = {
	title: string;
	mode: Modes;
	Icon: ImageURISource;
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
	},
	{
		title: "6-Pack",
		mode: "static6",
		Icon: require("@/assets/images/mode-icons/loupe.png"),
	},
	{
		title: "8-Pack",
		mode: "static8",
		Icon: require("@/assets/images/mode-icons/8-ball.png"),
	},
	{
		title: "High-5",
		mode: "race5",
		Icon: require("@/assets/images/mode-icons/high-5.png"),
	},
	{
		title: "Disco",
		mode: "disco60",
		Icon: require("@/assets/images/mode-icons/disco.png"),
	},
	{
		title: "Relax",
		mode: "relax",
		Icon: require("@/assets/images/mode-icons/ying-yang.png"),
	},
	// {
	// 	title: "Relax: Harder",
	// 	mode: "relaxHard",
	// 	// Icon: LocalBarRoundedIcon,
	// },
];
