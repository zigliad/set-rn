import { AwesomeModalActions } from "@/components/awesome-modal/AwesomeModalActions";
import { PaletteDisplay } from "@/components/pages/colors/PaletteDisplay";
import { Divider } from "@/components/ui/divider";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { Sound } from "@/constants/sounds";
import { useCurrencies } from "@/hooks/useCurrencies";
import {
	DEFAULT_PALETTE_PRICE,
	Palette,
	useColors,
} from "@/hooks/useInitColors";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import React, { DispatchWithoutAction } from "react";

export const BuyPaletteModal = ({
	onResolve,
	palette,
}: {
	onResolve: DispatchWithoutAction;
	palette?: Palette;
}) => {
	const { addPalette, setCurrentPaletteId } = useColors();
	const { incCoins, incGems, coins, gems } = useCurrencies();

	if (!palette) return;

	const coinsPrice = palette.price?.coins ?? DEFAULT_PALETTE_PRICE.coins ?? 0;
	const gemsPrice = palette.price?.gems ?? DEFAULT_PALETTE_PRICE.gems ?? 0;

	return (
		<Modal isOpen={palette !== undefined}>
			<ModalBackdrop onPress={onResolve} />
			<ModalContent
				className="relative overflow-visible bg-background-card p-2 rounded-xl"
				style={{ borderWidth: 0, maxWidth: 280 }}
			>
				<Text
					size="2xl"
					className="text-center"
					style={fontWeightStyles.black}
				>
					{palette.nickname} Palette
				</Text>
				<Divider className="my-2" />
				<VStack className="w-full items-center" space="lg">
					<Text
						className="text-center"
						style={fontWeightStyles.medium}
					>
						Are you sure you want to buy?
					</Text>
					<PriceTag
						currency="coin"
						price={coinsPrice}
						space="sm"
						fontSize={26}
						currencySize={20}
					/>
					<PaletteDisplay {...{ palette }} />

					<AwesomeModalActions
						type="info"
						buttonText="Buy"
						onResolve={() => {
							onResolve();
							if (gems >= gemsPrice && coins >= coinsPrice) {
								playSound(Sound.buy);
								addPalette(palette);
								setCurrentPaletteId(palette.id);
								incCoins(-coinsPrice);
								incGems(-gemsPrice);
							} else {
								playSound(Sound.error);
								router.push("/shop");
							}
						}}
						secondaryButtonText="Not Now"
						secondaryOnResolve={() => {
							playSound(Sound.click);
							onResolve();
						}}
					/>
				</VStack>
			</ModalContent>
		</Modal>
	);
};
