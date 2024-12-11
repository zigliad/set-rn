import Card from "@/bl/card/Card";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { BackButton } from "@/components/utils/BackButton";
import { useStorageObjectState } from "@/hooks/useStorageState";
import { fontWeightStyles } from "@/styles/commonStyles";
import { StorageKey } from "@/utils/storage";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from "react-native-super-grid";

export const DEFAULT_SETS_FOUND: string[] = [];

const styles = StyleSheet.create({
	itemContainer: { height: "100%" },
	cardWrapper: { height: "32%" },
	card: {
		width: 180,
		height: "100%",
	},
});

export default function SetsFound() {
	const [setsFound] = useStorageObjectState<string[]>(
		StorageKey.setsFound,
		DEFAULT_SETS_FOUND
	);

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full">
				<FlatGrid
					spacing={20}
					data={setsFound}
					itemDimension={180}
					itemContainerStyle={styles.itemContainer}
					horizontal
					keyExtractor={(x) => x}
					renderItem={({ item, index }) => {
						const setCards = item
							.split(":")
							.map(
								(card) =>
									new Card(card.split("-").map((x) => +x))
							);
						return (
							<Center className="h-full flex flex-col justify-between">
								{setCards.map((card) => (
									<Center
										style={styles.cardWrapper}
										key={card.toString()}
									>
										<PlayingCard
											card={card}
											size={styles.card}
										/>
									</Center>
								))}
							</Center>
						);
					}}
				/>
				<BackButton />
				<Center className="absolute bottom-4 right-4 py-2 px-4 bg-background-800 rounded-full shadow-xl">
					<Text
						size="lg"
						className="text-typography-0"
						style={fontWeightStyles.black}
					>
						{setsFound?.length ?? 0} / 1080
					</Text>
				</Center>
			</Box>
		</SafeAreaView>
	);
}
