import { ElevatedCard } from "@/components/ElevatedCard";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { useMode } from "@/modes/context/context";
import React from "react";
import { FlatGrid } from "react-native-super-grid";
import useList from "react-use/lib/useList";

export const GameGrid = () => {
	const modeData = useMode();

	const { deck, checkSet, gameEnded, endgameTitle } = useMode();
	const [picked, { push, removeAt, reset }] = useList<number>([]);

	const cardClicked = (index: number) => {
		const indexOfIndex = picked.indexOf(index);
		if (indexOfIndex > -1) {
			removeAt(indexOfIndex);
		} else {
			const pickedCloned = [...picked, index];
			push(index);
			const isSet = checkSet(pickedCloned);
			if (pickedCloned.length === deck.brain.setSize) {
				setTimeout(reset, 200);
			}

			if (isSet) {
			}
		}
	};

	if (gameEnded) {
		return (
			<Center className="w-full h-full">
				<ElevatedCard className="p-8">
					<Text>{endgameTitle}</Text>
				</ElevatedCard>
			</Center>
		);
	}

	return (
		<FlatGrid
			maxItemsPerRow={4}
			spacing={12}
			data={modeData.deck.cards}
			scrollEnabled={false}
			renderItem={({ item, index }) => {
				return (
					<ElevatedCard
						className="h-24"
						key={item.attributes.join("")}
					>
						<Text>{item.attributes.join("")}</Text>
					</ElevatedCard>
				);
			}}
		/>
	);
};
