import { ElevatedCard } from "@/components/ElevatedCard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useMode } from "@/modes/context/context";
import { router } from "expo-router";
import { CircleArrowLeft, Info, RotateCcw } from "lucide-react-native";
import React, { useState } from "react";

export const GameBar = () => {
	const modeData = useMode();
	const [textBoxSize, setTextBoxSize] = useState<{
		width: number;
		height: number;
	}>();

	return (
		<ElevatedCard className="h-full w-16 flex justify-between py-2">
			<Box>
				<Button
					variant="link"
					onPress={() => {
						router.back();
					}}
				>
					<Icon as={Info} size={25} />
				</Button>
				<Button
					variant="link"
					onPress={() => {
						modeData.newGame();
					}}
				>
					<Icon as={RotateCcw} size={25} />
				</Button>
			</Box>
			<Center
				className="-rotatex-90 flex-1 flex-1 "
				onLayout={(event) => {
					event.target.measure((x, y, width, height) => {
						if (!textBoxSize) setTextBoxSize({ width, height });
					});
				}}
			>
				<Text
					className="text-primary-500 -rotate-90 text-center"
					size="lg"
					style={{
						width: textBoxSize?.height,
						height: "auto",
					}}
				>
					{modeData.title}
				</Text>
			</Center>
			<Button
				variant="link"
				onPress={() => {
					router.back();
				}}
			>
				<Icon as={CircleArrowLeft} size={25} />
			</Button>
		</ElevatedCard>
	);
};