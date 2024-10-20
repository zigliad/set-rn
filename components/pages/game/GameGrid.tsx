import { Set as CardsSet } from "@/bl/types/set";
import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Box } from "@/components/ui/box";
import { sounds } from "@/constants/sounds";
import { useMode } from "@/modes/modesContext";
import { GameResult } from "@/modes/modeTypes";
import { playSound } from "@/utils/soundPlayer";
import {
	getData,
	getObjectData,
	StorageKey,
	storeData,
	storeObjectData,
} from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import useList from "react-use/lib/useList";

const SPACING = 12;

const setFound = async (set: CardsSet) => {
	const totalSetsFound = (await getData(StorageKey.totalSetsFound)) ?? 0;
	await storeData(StorageKey.totalSetsFound, +totalSetsFound + 1);

	if (set[0].attributes.length === 4) {
		const setString = set
			.map((c) => c.toString())
			.sort()
			.join(":");
		const setsFound = (await getObjectData(StorageKey.setsFound)) ?? [];
		const newSetsFound = new Set([...setsFound, setString]);
		await storeObjectData(StorageKey.setsFound, Array.from(newSetsFound));
	}
};

export const GameGrid = () => {
	const {
		checkSet,
		gameEnded,
		endgameTitle,
		endgameContent,
		gameResult,
		deck,
		newGame,
	} = useMode();

	const [picked, { push, removeAt, reset }] = useList<number>([]);
	const [gridSize, setGridSize] = useState<{
		width: number;
		height: number;
	}>();

	const cardClicked = async (index: number) => {
		const indexOfIndex = picked.indexOf(index);
		if (indexOfIndex > -1) {
			removeAt(indexOfIndex);
		} else {
			const pickedCloned = [...picked, index];
			push(index);
			if (pickedCloned.length === deck.brain.setSize) {
				setTimeout(reset, 200);
				const { isSet, set } = await checkSet(pickedCloned);
				await playSound(isSet ? sounds.setFound : sounds.error);
				if (isSet && set) await setFound(set);
			}
		}
	};

	const [visibleModal, setVisibleModal] = useState(false);

	useEffect(() => {
		if (gameEnded) {
			(async () => {
				setVisibleModal(true);
				await playSound(
					gameResult === GameResult.lose ? sounds.lose : sounds.win
				);
			})();
		}
	}, [gameEnded, gameResult]);

	return (
		<>
			<FlatGrid
				className="h-full"
				onLayout={(event) => {
					event.target.measure((x, y, width, height) => {
						setGridSize({ width, height });
					});
				}}
				maxItemsPerRow={4}
				spacing={SPACING}
				data={deck.cards}
				scrollEnabled={false}
				keyExtractor={(item) => item.attributes.join("")}
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
			<AwesomeModal
				visible={visibleModal}
				onResolve={async () => {
					setVisibleModal(false);
					newGame();
					await playSound(sounds.restart);
				}}
				header={endgameTitle}
				content={endgameContent}
				type={gameResult === GameResult.lose ? "error" : "success"}
				buttonText={"Play Again"}
			/>
		</>
	);
};
