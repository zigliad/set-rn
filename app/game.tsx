import { GameBar } from "@/components/pages/game/GameBar";
import { GameGrid } from "@/components/pages/game/GameGrid";
import { HStack } from "@/components/ui/hstack";
import { ModeContext } from "@/modes/context/context";
import { modes, Modes } from "@/modes/modes";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import useMount from "react-use/lib/useMount";

export default function Game() {
	const { mode } = useLocalSearchParams<{ mode: Modes }>();
	const useChosenMode = modes[mode];
	const modeData = useChosenMode();
	useMount(modeData.newGame);

	return (
		<SafeAreaView className="bg-background-base w-full h-full">
			<ModeContext.Provider value={modeData}>
				<HStack
					className="h-full w-full pt-4 pb-2 flex justify-center items-center"
					space="lg"
				>
					<GameGrid />
					<GameBar />
				</HStack>
			</ModeContext.Provider>
		</SafeAreaView>
	);
}
