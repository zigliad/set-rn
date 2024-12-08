import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { sounds } from "@/constants/sounds";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";

export const BackButton = () => {
	return (
		<Button
			className="absolute bottom-0 left-0 rounded-full bg-background-800 shadow-xl"
			onPress={async () => {
				playSound(sounds.click);
				router.back();
			}}
		>
			<Icon as={ArrowLeft} className={"w-6 h-6 text-typography-0"} />
		</Button>
	);
};
