import { ElevatedCard } from "@/components/ElevatedCard";
import { BuyPaletteModal } from "@/components/pages/colors/BuyPaletteModel";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { CLASSIC_PALETTE_ID, DEFAULT_MY_PALETTES, DEFAULT_PALETTE_PRICE, Palette, useColors } from "@/hooks/useInitColors";
import { useStorageObjectState, useStorageState } from "@/hooks/useStorageState";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { ArrowLeft, Check, Coins } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatGrid } from "react-native-super-grid";

export default function Color() {
	const x = useColors();
	const [coins, setCoins] = useStorageState(StorageKey.coins, String(0));
	const [paletteClicked, setPaletteClicked] = useState<Palette>();
	const [myPalettes, setMyPalettes] = useStorageObjectState<string[]>(
		StorageKey.myPalettes,
		DEFAULT_MY_PALETTES
	);

	const borderColor = x.currentPalette.colors[0];

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full flex flex-row">
				<VStack className="w-1/3 px-2 py-4">
					<PriceTag price={+coins} fontSize={48} currencySize={48} />
				</VStack>
				<FlatGrid
					className="w-2/3"
					maxItemsPerRow={2}
					spacing={12}
					data={Object.values(x.allPalettes).filter(
						(p) => !p.unavailable || (myPalettes ?? []).includes(p.id)
					)}
					renderItem={({ item: palette }) => {
						const colors = palette.colors;
						const ownPalette = (
							myPalettes ?? [CLASSIC_PALETTE_ID]
						).includes(palette.id);
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
										playSound(sounds.click);
										if (ownPalette) {
											x.setCurrentPaletteId(palette.id);
										} else {
											if (
												+coins >=
												(palette.price ??
													DEFAULT_PALETTE_PRICE)
											) {
												setPaletteClicked(palette);
											} else {
												// playSound(sounds.error);
											}
										}
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
												style={fontWeightStyles.medium}
											>
												{palette.nickname}
											</Text>
											{!ownPalette && (
												<HStack
													space="xs"
													className="items-center"
												>
													<Text
														size="xl"
														style={
															fontWeightStyles.medium
														}
													>
														{palette.price ??
															DEFAULT_PALETTE_PRICE}
													</Text>
													<Icon
														as={Coins}
														className={"w-4 h-4"}
													/>
												</HStack>
											)}
											{isCurrentPalette && (
												<Icon
													as={Check}
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
			{paletteClicked && (
				<BuyPaletteModal
					palette={paletteClicked}
					visible={paletteClicked !== undefined}
					onResolve={(buy: boolean) => {
						if (buy) {
							playSound(sounds.buy);
							setMyPalettes([...myPalettes, paletteClicked.id]);
							x.setCurrentPaletteId(paletteClicked.id);
							setCoins(
								String(
									+coins -
										(paletteClicked.price ??
											DEFAULT_PALETTE_PRICE)
								)
							);
						} else {
							playSound(sounds.click);
						}
						setPaletteClicked(undefined);
					}}
				/>
			)}
		</SafeAreaView>
	);
}
