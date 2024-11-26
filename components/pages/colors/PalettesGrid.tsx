import { ElevatedCard } from "@/components/ElevatedCard";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { Action1 } from "@/extra-types/utils/functions";
import { useCurrencies } from "@/hooks/useCurrencies";
import {
	CLASSIC_PALETTE_ID,
	DEFAULT_PALETTE_PRICE,
	Palette,
	useColors,
} from "@/hooks/useInitColors";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { Check, Coins } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export const PalettesGrid = ({
	onPaletteClick,
}: {
	onPaletteClick: Action1<Palette>;
}) => {
	const x = useColors();
	const { coins } = useCurrencies();
	const borderColor = x.currentPalette.colors[0];

	return (
		<FlatGrid
			className="w-2/3"
			maxItemsPerRow={2}
			spacing={12}
			data={Object.values(x.allPalettes).filter(
				(p) => !p.unavailable || (x.myPalettes ?? []).includes(p.id)
			)}
			renderItem={({ item: palette }) => {
				const colors = palette.colors;
				const ownPalette = (
					x.myPalettes ?? [CLASSIC_PALETTE_ID]
				).includes(palette.id);
				const isCurrentPalette =
					x.currentPalette.colors.join() === palette.colors.join();
				return (
					<ElevatedCard
						key={palette.id}
						className={
							"relative " + (!ownPalette ? "opacity-25" : "")
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
										coins >=
										(palette.price?.coins ??
											DEFAULT_PALETTE_PRICE.coins ??
											0)
									) {
										onPaletteClick(palette);
									} else {
										playSound(sounds.error);
										router.push("/shop");
									}
								}
							}}
						>
							<VStack space="sm" className="p-2">
								<HStack className="justify-between items-center">
									<Text
										size="xl"
										style={fontWeightStyles.medium}
									>
										{palette.nickname}
									</Text>
									{!ownPalette && (
										<PriceTag
											space="sm"
											price={
												palette.price?.coins ??
												DEFAULT_PALETTE_PRICE.coins ??
												0
											}
											fontSize={16}
											currencySize={16}
											dir="rtl"
										/>
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
													: i === colors.length - 1
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
	);
};
