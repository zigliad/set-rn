import { GridAction, GridActions } from "@/components/GridActions";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { useColors, useInitColors } from "@/hooks/useInitColors";
import { modesConfig } from "@/modes/modesConfig";
import { router } from "expo-router";
import { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const moreOptions: GridAction[] = [
	{
		title: "More",
		Icon: require("@/assets/images/mode-icons/relax.png"),
		onClick: () => {
			router.push({ pathname: "/more" });
		},
	},
];

export default function Index() {
	const { colors } = useColors();
	const confettiRef = useRef<ConfettiCannon | null>(null);

	return (
		<SafeAreaView className="bg-background-base">
			<View className="relative">
				<Heading
					className="absolute top-8 left-8"
					size="5xl"
					style={{
						zIndex: 0,
						fontFamily: "PlayfairDisplay_Black",
						fontSize: 130,
						textShadowColor: "#aaa",
						textShadowOffset: { width: 5, height: 5 },
						textShadowRadius: 0,
					}}
				>
					SET
				</Heading>
				<HStack className="w-5/6 self-end">
					<GridActions
						actions={modesConfig
							.map((modeConf) => ({
								...modeConf,
								onClick: () => {
									router.push({
										pathname: "/game",
										params: {
											mode: modeConf.mode,
										},
									});
								},
							}))
							.concat(moreOptions)}
					/>
				</HStack>
				{/* <ConfettiCannon
					ref={confettiRef}
					count={40}
					autoStartDelay={0}
					fallSpeed={5000}
					origin={{ x: -10, y: -10 }}
					colors={colors}
					explosionSpeed={1000}
					fadeOut
					onAnimationEnd={() => confettiRef.current?.start()}
				/> */}
			</View>
		</SafeAreaView>
	);
}
