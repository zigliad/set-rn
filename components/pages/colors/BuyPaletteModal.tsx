import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { sounds } from "@/constants/sounds";
import { useCurrencies } from "@/hooks/useCurrencies";
import {
	DEFAULT_PALETTE_PRICE,
	Palette,
	useColors,
} from "@/hooks/useInitColors";
import { playSound } from "@/utils/soundPlayer";
import { Store } from "lucide-react-native";
import React, { DispatchWithoutAction } from "react";

export const BuyPaletteModal = ({
	onResolve,
	palette,
}: {
	onResolve: DispatchWithoutAction;
	palette?: Palette;
}) => {
	const { addPalette, setCurrentPaletteId } = useColors();
	const { incCoins, incGems } = useCurrencies();

	if (!palette) return;

	return (
		<AwesomeModal
			visible={palette !== undefined}
			icon={Store}
			header={`${palette.nickname} Palette`}
			buttonText="Buy"
			secondaryButtonText="Not Now"
			content={`Are you sure you want to buy ${palette.nickname} palette for ${palette.price?.coins ?? DEFAULT_PALETTE_PRICE.coins} coins?`}
			onResolve={() => {
				playSound(sounds.buy);
				addPalette(palette);
				setCurrentPaletteId(palette.id);
				incCoins(
					-(palette.price?.coins ?? DEFAULT_PALETTE_PRICE.coins ?? 0)
				);
				incGems(
					-(palette.price?.gems ?? DEFAULT_PALETTE_PRICE.gems ?? 0)
				);
				onResolve();
			}}
			secondaryOnResolve={() => {
				playSound(sounds.click);
				onResolve();
			}}
		/>
	);
};
