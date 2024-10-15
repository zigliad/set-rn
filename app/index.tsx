import { gameColors } from "@/assets/game-colors/gameColors";
import { GridActions } from "@/components/pages/home/GridActions";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Index() {
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
				<HStack className="w-9/12 self-end">
					<GridActions />
				</HStack>
				<ConfettiCannon
					ref={confettiRef}
					count={40}
					autoStartDelay={0}
					fallSpeed={5000}
					origin={{ x: -10, y: -10 }}
					colors={gameColors}
					explosionSpeed={1000}
					fadeOut
					onAnimationEnd={() => confettiRef.current?.start()}
				/>
			</View>
		</SafeAreaView>
	);
}
