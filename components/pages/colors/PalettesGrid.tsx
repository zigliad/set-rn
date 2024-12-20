import { ElevatedCard } from "@/components/ElevatedCard";
import { PaletteDisplay } from "@/components/pages/colors/PaletteDisplay";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Sound } from "@/constants/sounds";
import { Action1 } from "@/extra-types/utils/functions";
import { useCurrencies } from "@/hooks/useCurrencies";
import { CLASSIC_PALETTE_ID, Palette, useColors } from "@/hooks/useInitColors";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { Check, Lock } from "lucide-react-native";
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
								playSound(Sound.click);
								if (ownPalette) {
									x.setCurrentPaletteId(palette.id);
								} else {
									onPaletteClick(palette);
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
										<Icon as={Lock} className={"w-6 h-6"} />
									)}
									{isCurrentPalette && (
										<Icon
											as={Check}
											className={"w-6 h-6"}
										/>
									)}
								</HStack>
								<PaletteDisplay {...{ palette }} />
							</VStack>
						</TouchableOpacity>
					</ElevatedCard>
				);
			}}
		/>
	);
};
