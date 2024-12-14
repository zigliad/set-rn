import Card from "@/bl/card/Card";
import { Set as CardsSet } from "@/bl/types/set";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Box } from "@/components/ui/box";
import { Sound } from "@/constants/sounds";
import { useMode } from "@/modes/modesContext";
import { playSound } from "@/utils/soundPlayer";
import {
	getData,
	getObjectData,
	StorageKey,
	storeData,
	storeObjectData,
} from "@/utils/storage";
import React, {
	DispatchWithoutAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { FlatGrid } from "react-native-super-grid";
import { IHookStateSetAction } from "react-use/lib/misc/hookState";

const SPACING = 12;

const setFound = async (set: CardsSet) => {
	const totalSetsFound = await getData(StorageKey.totalSetsFound, "0");
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

export const GameGrid = ({
	picked,
	push,
	removeAt,
	reset,
	dummyPicked,
	dummyReset,
	dummySet,
}: {
	picked: number[];
	push: (...items: number[]) => void;
	removeAt: (index: number) => void;
	reset: DispatchWithoutAction;
	dummyPicked: number[];
	dummyReset: DispatchWithoutAction;
	dummySet: (newList: IHookStateSetAction<number[]>) => void;
}) => {
	const { checkSet, deck } = useMode();

	const [gridSize, setGridSize] = useState<{
		width: number;
		height: number;
	}>();

	const _checkSet = useCallback(
		async (newPicked: number[]) => {
			dummySet(newPicked);
			setTimeout(dummyReset, 200);
			reset();
			const { isSet, set } = await checkSet(newPicked);
			playSound(isSet ? Sound.setFound : Sound.error);
			if (isSet && set) await setFound(set);
		},
		[dummySet, dummyReset, reset, checkSet]
	);

	const cardClicked = useCallback(
		async (index: number) => {
			const indexOfIndex = picked.indexOf(index);
			if (indexOfIndex > -1) removeAt(indexOfIndex);
			else push(index);
		},
		[picked, removeAt, push]
	);

	useEffect(() => {
		(async () => {
			if (picked.length === deck.brain.setSize) {
				await _checkSet(picked);
			} else if (picked.length > deck.brain.setSize) {
				// should'nt happen, but prevents bugs
				reset();
				dummyReset();
			}
		})();
	}, [deck.brain.setSize, picked, _checkSet, reset, dummyReset]);

	const cardSize = useMemo(
		() =>
			gridSize
				? {
						width: (gridSize.width - 5 * SPACING) / 4,
						height: (gridSize.height - 4 * SPACING) / 3,
					}
				: null,
		[gridSize]
	);

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
				data={deck.cards.map((c) =>
					c === null ? new Card([-1, -1, -1, -1]) : c
				)}
				scrollEnabled={false}
				renderItem={({ item, index }) => {
					if (cardSize) {
						return item.attributes[0] !== -1 ? (
							<PlayingCard
								card={item}
								key={item.attributes.join("")}
								onPress={() => cardClicked(index)}
								picked={
									dummyPicked.includes(index) ||
									picked.includes(index)
								}
								size={cardSize}
							/>
						) : (
							<Box key={index} style={cardSize} />
						);
					}

					return <Box />;
				}}
			/>
		</>
	);
};
