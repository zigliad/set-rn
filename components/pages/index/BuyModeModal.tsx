import { AwesomeModalActions } from "@/components/awesome-modal/AwesomeModalActions";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { useMyModes } from "@/hooks/ads/useMyModes";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useColors } from "@/hooks/useInitColors";
import { DEFAULT_MODE_PRICE, ModeConfig } from "@/modes/modesConfig";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
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

	const coinsPrice = mode.price?.coins ?? DEFAULT_MODE_PRICE.coins ?? 0;
	const gemsPrice = mode.price?.gems ?? DEFAULT_MODE_PRICE.gems ?? 0;
	const color = "#ff5364";

	return (
		<Modal isOpen={mode !== undefined}>
			<ModalBackdrop onPress={onResolve} />
			<ModalContent
				className="relative overflow-visible bg-background-card p-2 rounded-xl"
				style={{ borderWidth: 0, maxWidth: 320 }}
			>
				<VStack className="w-full items-center" space="md">
					<HStack space="lg" className="p-2">
						<Center
							className={"w-24 h-24 rounded-full overflow-hidden"}
							style={{ backgroundColor: color }}
						>
							<Image
								source={mode.Icon}
								alt={mode.title}
								className="w-24 h-24"
								tintColor={"#fff"}
							/>
						</Center>
						<VStack>
							<Heading size="2xl" style={fontWeightStyles.black}>
								{mode.title} Mode
							</Heading>
							<Text
								className="text-center"
								style={fontWeightStyles.medium}
							>
								Are you sure you want to buy?
							</Text>
							<Box className="mt-2">
								<PriceTag
									currency="gem"
									price={gemsPrice}
									space="sm"
									fontSize={26}
									currencySize={26}
								/>
							</Box>
						</VStack>
					</HStack>
					<AwesomeModalActions
						// type="info"
						color={color}
						buttonText="Buy"
						onResolve={() => {
							playSound(sounds.buy);
							setMyModes([...myModes, mode.mode]);
							incGems(-gemsPrice);
							incCoins(-coinsPrice);
							onResolve();
						}}
						secondaryButtonText="Not Now"
						secondaryOnResolve={() => {
							playSound(sounds.click);
							onResolve();
						}}
					/>
				</VStack>
			</ModalContent>
		</Modal>
	);

	// return (
	// 	<AwesomeModal
	// 		visible={mode !== undefined}
	// 		icon={Store}
	// 		header={`${mode.title} Mode`}
	// 		buttonText="Buy"
	// 		secondaryButtonText="Not Now"
	// 		content={`Are you sure you want to buy ${mode.title} mode for ${mode.price?.gems ?? DEFAULT_MODE_PRICE.gems} gems?`}
	// 		onResolve={() => {
	// 			playSound(sounds.buy);
	// 			setMyModes([...myModes, mode.mode]);
	// 			incGems(-(mode.price?.gems ?? DEFAULT_MODE_PRICE.gems ?? 0));
	// 			incCoins(-(mode.price?.coins ?? DEFAULT_MODE_PRICE.coins ?? 0));
	// 			onResolve();
	// 		}}
	// 		secondaryOnResolve={() => {
	// 			playSound(sounds.click);
	// 			onResolve();
	// 		}}
	// 	/>
	// );
};