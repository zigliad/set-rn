import Card from "@/bl/card/Card";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { sounds } from "@/constants/sounds";
import { useStorageObjectState } from "@/hooks/useStorageState";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { FlatGrid } from "react-native-super-grid";

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
		[]
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
				<Button
					className="absolute bottom-0 left-0 rounded-full bg-background-800 shadow-xl"
					onPress={async () => {
						playSound(sounds.click);
						router.back();
					}}
				>
					<Icon
						as={ArrowLeft}
						className={"w-6 h-6 text-typography-0"}
					/>
				</Button>
				<Center className="absolute bottom-0 right-0 py-2 px-4 bg-background-800 rounded-full shadow-xl">
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
