import { ModeContext } from "@/modes/context/context";
import { modes, Modes } from "@/modes/modes";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import useMount from "react-use/lib/useMount";

export default function Game() {
	const { mode } = useLocalSearchParams<{ mode: Modes }>();
	const useMode = modes[mode];

	const modeData = useMode();
	useMount(modeData.newGame);

	return (
		<SafeAreaView className="bg-background-base w-full h-full">
			<ModeContext.Provider value={modeData}>
				<Text>{mode}</Text>
				{/* <GameBar />
				<GameGrid /> */}
			</ModeContext.Provider>
		</SafeAreaView>
	);
}
