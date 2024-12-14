import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Sound } from "@/constants/sounds";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";

export const BackButton = () => {
	return (
		<Button
			className="absolute bottom-4 left-4 rounded-full bg-background-800 shadow-xl"
			onPress={async () => {
				playSound(Sound.click);
				router.back();
			}}
		>
			<Icon as={ArrowLeft} className={"w-6 h-6 text-typography-0"} />
		</Button>
	);
};
