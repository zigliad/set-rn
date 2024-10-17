import { ElevatedCard } from "@/components/ElevatedCard";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { useMode } from "@/modes/context/context";
import React, { useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import useList from "react-use/lib/useList";

const SPACING = 12;
const CARD_PADDING = 6;

export const GameGrid = () => {
	const modeData = useMode();

	const { deck, checkSet, gameEnded, endgameTitle } = useMode();
	const [picked, { push, removeAt, reset }] = useList<number>([]);
	const [gridSize, setGridSize] = useState<{
		width: number;
		height: number;
	}>();

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
			className="h-full"
			onLayout={(event) => {
				event.target.measure((x, y, width, height) => {
					setGridSize({ width, height });
				});
			}}
			maxItemsPerRow={4}
			spacing={SPACING}
			data={modeData.deck.cards}
			scrollEnabled={false}
			keyExtractor={(item) => item.attributes.join("")}
			// contentContainerStyle={{ margin: -CARD_PADDING }}
			renderItem={({ item, index }) => {
				if (gridSize) {
					const cardSize = {
						width: (gridSize.width - 5 * SPACING) / 4,
						height: (gridSize.height - 4 * SPACING) / 3,
					};
					return (
						<PlayingCard
							card={item}
							onPress={() => cardClicked(index)}
							picked={picked.indexOf(index) > -1}
							size={cardSize}
						/>
					);
				}

				return <Box />;
			}}
		/>
	);
};
