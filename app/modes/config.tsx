import { Modes } from "@/app/modes/modes";

export type ModeConfig = {
	title: string;
	mode: Modes;
	// Icon: OverridableComponent<SvgIconTypeMap>;
};

export const modesConfig: ModeConfig[] = [
	{
		title: "FILLER",
		mode: "time60",
		// Icon: AccessTimeRoundedIcon,
	},
	{
		title: "Time",
		mode: "time60",
		// Icon: AccessTimeRoundedIcon,
	},
	// {
	// 	title: "Time: Harder",
	// 	mode: "time60Attributes5",
	// 	// Icon: AccessTimeRoundedIcon,
	// },
	{
		title: "Static",
		mode: "static6",
		// Icon: SearchRoundedIcon,
	},
	{
		title: "Race",
		mode: "race5",
		// Icon: EmojiFlagsRoundedIcon,
	},
	{
		title: "Disco",
		mode: "disco",
		// Icon: ColorLensRoundedIcon,
	},
	{
		title: "Relax",
		mode: "relax",
		// Icon: LocalBarRoundedIcon,
	},
	// {
	// 	title: "Relax: Harder",
	// 	mode: "relaxHard",
	// 	// Icon: LocalBarRoundedIcon,
	// },
];
