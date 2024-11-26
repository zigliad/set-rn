import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { sounds } from "@/constants/sounds";
import { useCurrencies } from "@/hooks/useCurrencies";
import {
	DEFAULT_PALETTE_PRICE,
	Palette,
	useColors,
} from "@/hooks/useInitColors";
import { DEFAULT_MODE_PRICE, ModeConfig } from "@/modes/modesConfig";
import { playSound } from "@/utils/soundPlayer";
import { Store } from "lucide-react-native";
import React, { DispatchWithoutAction } from "react";

export const BuyModeModal = ({
	onResolve,
	mode,
}: {
	onResolve: DispatchWithoutAction;
	mode?: ModeConfig;
}) => {
	// const { addPalette, setCurrentPaletteId } = useColors();
	const { incGems, incCoins } = useCurrencies();

	if (!mode) return;

	return (
		<AwesomeModal
			visible={mode !== undefined}
			icon={Store}
			header={`${mode.title} Mode`}
			buttonText="Buy"
			secondaryButtonText="Not Now"
			content={`Are you sure you want to buy ${mode.title} mode for ${mode.price?.gems ?? DEFAULT_MODE_PRICE.gems} gems?`}
			onResolve={() => {
				playSound(sounds.buy);
				// addPalette(palette);
				// setCurrentPaletteId(palette.id);
				incGems(-(mode.price?.gems ?? DEFAULT_MODE_PRICE.gems ?? 0));
				incCoins(-(mode.price?.coins ?? DEFAULT_MODE_PRICE.coins ?? 0));
				onResolve();
			}}
			secondaryOnResolve={() => {
				playSound(sounds.click);
				onResolve();
			}}
		/>
	);
};
