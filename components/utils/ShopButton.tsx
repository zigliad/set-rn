import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { sounds } from "@/constants/sounds";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { Store } from "lucide-react-native";
import React from "react";

export const ShopButton = () => {
	return (
		<Button
			className="absolute bottom-4 left-8 rounded-full bg-background-800 shadow-xl w-16 h-16"
			onPress={async () => {
				playSound(sounds.click);
				router.push("/shop");
			}}
		>
			<Icon as={Store} className={"w-10 h-10 text-typography-0"} />
		</Button>
	);
};
