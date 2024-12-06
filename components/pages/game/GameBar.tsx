import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { ElevatedCard } from "@/components/ElevatedCard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { sounds } from "@/constants/sounds";
import { useMode } from "@/modes/modesContext";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import {
	CircleArrowLeft,
	GraduationCap,
	Info,
	RotateCcw,
} from "lucide-react-native";
import React, { DispatchWithoutAction, useState } from "react";
import { View } from "react-native";

const iconClassName = "w-7 h-7";

export const GameBar = ({
	resetPicked,
	dummyReset,
}: {
	resetPicked: DispatchWithoutAction;
	dummyReset: DispatchWithoutAction;
}) => {
	const modeData = useMode();
	const [visibleModal, setVisibleModal] = useState(false);
	const [textBoxSize, setTextBoxSize] = useState<{
		width: number;
		height: number;
	}>();

	return (
		<ElevatedCard className="h-full w-16 flex justify-between py-2">
			<Box>
				<Button
					variant="link"
					onPress={async () => {
						setVisibleModal(true);
						await playSound(sounds.click);
					}}
				>
					<Icon as={Info} className={iconClassName} />
				</Button>
				<Button
					variant="link"
					onPress={async () => {
						resetPicked();
						dummyReset();
						modeData.newGame();
						await playSound(sounds.restart);
					}}
				>
					<Icon as={RotateCcw} className={iconClassName} />
				</Button>
			</Box>
			<Center
				className="flex-1"
				onLayout={(event) => {
					event.target.measure((x, y, width, height) => {
						if (!textBoxSize) setTextBoxSize({ width, height });
					});
				}}
			>
				<View>
					<Text
						className="text-primary-500 text-center"
						size="lg"
						style={{
							transform: [{ rotate: "-90deg" }],
							width: textBoxSize?.height,
							height: "auto",
							fontFamily: "PlayfairDisplay_Medium",
						}}
					>
						{modeData.title}
					</Text>
				</View>
			</Center>
			<Button
				variant="link"
				onPress={async () => {
					await playSound(sounds.click);
					router.back();
				}}
			>
				<Icon as={CircleArrowLeft} className={iconClassName} />
			</Button>
			<AwesomeModal
				visible={visibleModal}
				onResolve={() => setVisibleModal(false)}
				type="info"
				header="Rules"
				content={modeData.rules}
				icon={GraduationCap}
				backdropOnResolve
			/>
		</ElevatedCard>
	);
};
