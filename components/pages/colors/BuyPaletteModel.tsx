import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { DEFAULT_PALETTE_PRICE, Palette } from "@/hooks/useInitColors";
import { Coins } from "lucide-react-native";
import React from "react";

export const BuyPaletteModal = ({
	visible = false,
	onResolve,
	palette,
}: {
	visible?: boolean;
	onResolve: (buy: boolean) => void;
	palette: Palette;
}) => {
	return (
		<AwesomeModal
			visible={visible}
			icon={Coins}
			header={`${palette.nickname} Palette`}
			buttonText="Buy"
			secondaryButtonText="Not Now"
			content={`Are you sure you want to buy ${palette.nickname} palette for ${palette.price ?? DEFAULT_PALETTE_PRICE} coins?`}
			onResolve={() => {
				onResolve(true);
			}}
			secondaryOnResolve={() => {
				onResolve(false);
			}}
		/>
	);
};
