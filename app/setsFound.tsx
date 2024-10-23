import Card from "@/bl/card/Card";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useStorageObjectState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function SetsFound() {
	const [setsFound] = useStorageObjectState<string[]>(StorageKey.setsFound);

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full">
				<FlatGrid
					spacing={20}
					data={setsFound}
					itemDimension={180}
					itemContainerStyle={{ height: "100%" }}
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
										style={{ height: "32%" }}
										key={card.toString()}
									>
										<PlayingCard
											card={card}
											size={{
												width: 180,
												height: "100%",
											}}
										/>
									</Center>
								))}
							</Center>
						);
					}}
				/>
				<Button
					className="absolute bottom-0 left-0 rounded-full bg-background-800 shadow-xl"
					onPress={router.back}
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
						style={{
							fontFamily: "PlayfairDisplay_Black",
						}}
					>
						{setsFound?.length ?? 0} / 1080
					</Text>
				</Center>
			</Box>
		</SafeAreaView>
	);
}
