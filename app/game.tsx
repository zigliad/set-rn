import { GameBar } from "@/components/pages/game/GameBar";
import { GameGrid } from "@/components/pages/game/GameGrid";
import { HStack } from "@/components/ui/hstack";
import { modes, Modes } from "@/modes/modes";
import { ModeContext } from "@/modes/modesContext";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import useMount from "react-use/lib/useMount";
import useList from "react-use/lib/useList";

export default function Game() {
	const { mode } = useLocalSearchParams<{ mode: Modes }>();
	const useChosenMode = modes[mode];
	const modeData = useChosenMode();
	useMount(modeData.newGame);

	const [picked, { push, removeAt, reset }] = useList<number>([]);
	const [
		dummyPicked,
		{
			set: dummySet,
			push: dummyPush,
			removeAt: dummyRemoveAt,
			reset: dummyReset,
		},
	] = useList<number>([]);

	return (
		<SafeAreaView className="bg-background-base w-full h-full">
			<ModeContext.Provider value={modeData}>
				<HStack
					className="h-full w-full pt-4 pb-2 flex justify-center items-center"
					space="lg"
				>
					<GameGrid
						{...{
							picked,
							push,
							removeAt,
							reset,
							dummyPicked,
							dummyPush,
							dummyRemoveAt,
							dummyReset,
							dummySet,
						}}
					/>
					<GameBar resetPicked={reset} dummyReset={dummyReset} />
				</HStack>
			</ModeContext.Provider>
		</SafeAreaView>
	);
}
