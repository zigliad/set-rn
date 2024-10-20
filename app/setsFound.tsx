import Card from "@/bl/card/Card";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { useStorageObjectState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function SetsFound() {
	const [setsFound] = useStorageObjectState<string[]>(StorageKey.setsFound);

	return (
		<SafeAreaView className="bg-background-base relative">
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
							(card) => new Card(card.split("-").map((x) => +x))
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
				className="absolute"
				style={{ bottom: 24, left: 24 }}
				onPress={router.back}
			>
				<ButtonText>Back</ButtonText>
			</Button>
		</SafeAreaView>
	);
}
