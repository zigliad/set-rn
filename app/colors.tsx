import { titleStyles } from "@/app";
import { ElevatedCard } from "@/components/ElevatedCard";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { useColors } from "@/hooks/useInitColors";
import { useStorageState } from "@/hooks/useStorageState";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { ArrowLeft, BadgeCheck, Lock } from "lucide-react-native";
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

const myPalettes = ["classic", "christmas", "halloween", "superman"];

export default function Color() {
	const [coins, setCoins] = useStorageState(StorageKey.coins, String(0));
	const x = useColors();

	const borderColor = x.currentPalette.colors[0];

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full flex flex-row">
				<VStack className="w-1/3 px-2 py-4">
					<PriceTag price={1726} fontSize={48} currencySize={64} />
				</VStack>
				<FlatGrid
					className="w-2/3"
					maxItemsPerRow={2}
					spacing={12}
					data={Object.values(x.allPalettes).filter(
						(p) => !p.unavailable
					)}
					renderItem={({ item: palette }) => {
						const colors = palette.colors;
						const ownPalette = myPalettes.includes(palette.id);
						const isCurrentPalette =
							x.currentPalette.colors.join() ===
							palette.colors.join();
						return (
							<ElevatedCard
								className={
									"relative " +
									(!ownPalette ? "opacity-25" : "")
								}
								style={{
									...(isCurrentPalette && {
										borderLeftColor: borderColor,
										borderBottomColor: borderColor,
									}),
								}}
							>
								<TouchableOpacity
									onPress={() => {
										if (ownPalette)
											x.setCurrentPaletteId(palette.id);
									}}
								>
									<VStack
										space="sm"
										className="p-2"
										key={colors.join("-")}
									>
										<HStack className="justify-between items-center">
											<Text
												size="xl"
												style={{
													fontFamily:
														"PlayfairDisplay_Medium",
												}}
											>
												{palette.nickname}
											</Text>
											{!ownPalette && (
												<Icon
													as={Lock}
													className={"w-4 h-4"}
												/>
											)}
											{isCurrentPalette && (
												<Icon
													as={BadgeCheck}
													className={"w-6 h-6"}
												/>
											)}
										</HStack>
										<HStack>
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
									{/* <Center className="bg-background-800 absolute bottom-0 left-0 right-0 p-2 rounded-b-lg">
										<PriceTag price={10} reverseColors />
									</Center> */}
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
