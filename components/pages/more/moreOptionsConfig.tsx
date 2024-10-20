import { GridAction } from "@/components/GridActions";
import { router } from "expo-router";

export const moreOptionsConfig: GridAction[] = [
	{
		title: "Back",
		Icon: require("@/assets/images/mode-icons/relax.png"),
		onClick: router.back,
	},
	{
		title: "Back",
		Icon: require("@/assets/images/mode-icons/relax.png"),
		onClick: router.back,
	},
	{
		title: "Colors",
		Icon: require("@/assets/images/mode-icons/1-minute.png"),
		onClick: () => {},
	},
];
