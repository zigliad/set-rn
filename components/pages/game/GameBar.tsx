import { ElevatedCard } from "@/components/ElevatedCard";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useMode } from "@/modes/context/context";
import { router } from "expo-router";
import { CircleArrowLeft, Info } from "lucide-react-native";
import React from "react";

export const GameBar = () => {
	const modeData = useMode();

	return (
		<ElevatedCard className="h-full">
			<Center className="w-full h-full flex justify-between py-2">
				<Button
					variant="link"
					onPress={() => {
						router.back();
					}}
				>
					<Icon as={Info} size={"xl"} />
				</Button>
				<Text className="-rotate-90 text-primary-500" size="lg">
					{modeData.title}
				</Text>
				<Button
					variant="link"
					onPress={() => {
						router.back();
					}}
				>
					<Icon as={CircleArrowLeft} size={"xl"} />
				</Button>
			</Center>
		</ElevatedCard>
	);
};
