import { Badge } from "@/components/GridActions";
import { Award } from "lucide-react-native";

export enum Medal {
	bronze = 1,
	silver,
	gold,
}

export const medalConfig: Record<Medal, Badge> = {
	[Medal.gold]: {
		icon: Award,
		color: "#eab308",
	},
	[Medal.silver]: {
		icon: Award,
		color: "#c0c0c0",
	},
	[Medal.bronze]: {
		icon: Award,
		color: "#b45309",
	},
};
