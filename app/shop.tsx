import { OffersGrid } from "@/components/pages/shop/OffersGrid";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { BackButton } from "@/components/utils/BackButton";
import { PriceTag } from "@/components/utils/PriceTag";
import { rewarded, rewardedAdUnitId } from "@/constants/ads";
import { useCurrencies } from "@/hooks/useCurrencies";
import { fontWeightStyles } from "@/styles/commonStyles";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useRewardedAd } from "react-native-google-mobile-ads";

export default function Shop() {
	const { coins, gems } = useCurrencies();
	const { isLoaded, isClosed, load, show, reward, isEarnedReward } =
		useRewardedAd(rewardedAdUnitId);
	// const loaded = useRewardedAd(rewarded, (reward) => console.log(reward));

	useEffect(load, [load]);

	useEffect(() => {
		console.log(isEarnedReward, reward, isLoaded);
		if (isEarnedReward) load();
	}, [isEarnedReward, reward, isLoaded, load]);

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full flex flex-row">
				<VStack className="w-1/3 px-2 py-4" space="lg">
					<PriceTag
						currency="coin"
						price={coins}
						fontSize={52}
						currencySize={52}
					/>
					<PriceTag
						currency="gem"
						price={gems}
						fontSize={52}
						currencySize={52}
					/>
					<Divider />
					<Button
						// disabled={!loaded}
						// onPress={() => {
						// 	if (loaded) rewarded.show();
						// }}
						isDisabled={!isLoaded}
						onPress={() => {
							if (isLoaded) {
								show();
							}
						}}
					>
						<ButtonText style={fontWeightStyles.medium}>
							Watch ad for 10 coins
						</ButtonText>
					</Button>
					<Divider />
					<Button>
						<ButtonText style={fontWeightStyles.medium}>
							Remove ads for 2.99$
						</ButtonText>
					</Button>
				</VStack>
				<OffersGrid />
				<BackButton />
			</Box>
		</SafeAreaView>
	);
}
