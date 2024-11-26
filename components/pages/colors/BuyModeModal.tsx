import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { sounds } from "@/constants/sounds";
import { useMyModes } from "@/hooks/ads/useMyModes";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useStorageObjectState } from "@/hooks/useStorageState";
import { Modes } from "@/modes/modes";
import { DEFAULT_MODE_PRICE, ModeConfig } from "@/modes/modesConfig";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { Store } from "lucide-react-native";
import React, { DispatchWithoutAction } from "react";

export const BuyModeModal = ({
	onResolve,
	mode,
}: {
	onResolve: DispatchWithoutAction;
	mode?: ModeConfig;
}) => {
	const { myModes, setMyModes } = useMyModes();
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
				setMyModes([...myModes, mode.mode]);
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
