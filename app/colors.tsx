import { ElevatedCard } from "@/components/ElevatedCard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { sounds } from "@/constants/sounds";
import { useInitColors } from "@/hooks/useInitColors";
import { useStorageState } from "@/hooks/useStorageState";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatGrid } from "react-native-super-grid";

const styles = StyleSheet.create({
	itemContainer: { height: "100%" },
	cardWrapper: { height: "32%" },
	card: {
		width: 180,
		height: "100%",
	},
});

export default function Color() {
	const [coins, setCoins] = useStorageState(StorageKey.coins, String(0));
	const x = useInitColors();

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full">
				<Text>{x.currentColors.join(",")}</Text>
				<FlatGrid
					className="w-1/3"
					maxItemsPerRow={1}
					spacing={12}
					data={x.allColors}
					renderItem={({ item: palette }) => {
						const colors = palette.colors;
						return (
							<ElevatedCard>
								<TouchableOpacity
									onPress={() => {
										x.setCurrentColors(colors);
									}}
								>
									<VStack
										space="sm"
										className="p-2"
										key={colors.join("-")}
									>
										<Text size="xl">{palette.name}</Text>
										<HStack className="overflow-hidden">
											{colors.map((color, i) => (
												<Box
													key={color}
													className={
														"w-1/3 h-12 " +
														(i === 0
															? "rounded-l-xl"
															: i ===
																  colors.length -
																		1
																? "rounded-r-xl"
																: "")
													}
													style={{
														backgroundColor: color,
													}}
												/>
											))}
										</HStack>
									</VStack>
								</TouchableOpacity>
							</ElevatedCard>
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
			</Box>
		</SafeAreaView>
	);
}
