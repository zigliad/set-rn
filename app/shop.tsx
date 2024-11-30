import { ProductsGrid } from "@/components/pages/shop/ProductsGrid";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { BackButton } from "@/components/utils/BackButton";
import { PriceTag } from "@/components/utils/PriceTag";
import { rewardedAdUnitId } from "@/constants/ads";
import {
	LEGACY_PREMIUM_PRODUCT_ID,
	NON_CONSUMABLE_PRODUCT_IDS,
	REMOVE_ADS_PRODUCT_ID,
	useProducts,
} from "@/hooks/shop/useProducts";
import { useCurrencies } from "@/hooks/useCurrencies";
import { purchasedRemoveAds, useCustomerInfo } from "@/hooks/useCustomerInfo";
import { fontWeightStyles } from "@/styles/commonStyles";
import { useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native";
import { useRewardedAd } from "react-native-google-mobile-ads";
import Purchases from "react-native-purchases";

export default function Shop() {
	const { coins, gems } = useCurrencies();
	const { isLoaded, isClosed, load, show, reward, isEarnedReward } =
		useRewardedAd(rewardedAdUnitId);
	// const loaded = useRewardedAd(rewarded, (reward) => console.log(reward));

	const { customerInfo } = useCustomerInfo();
	const { products } = useProducts(NON_CONSUMABLE_PRODUCT_IDS);
	useEffect(() => console.log(products), [products]);

	useEffect(load, [load]);

	// useEffect(() => {
	// 	console.log(isEarnedReward, reward, isLoaded);
	// 	if (isEarnedReward) load();
	// }, [isEarnedReward, reward, isLoaded, load]);

	const hideRemoveAdsButton = useMemo(
		() => (customerInfo ? purchasedRemoveAds(customerInfo) : true),
		[customerInfo]
	);

	if (!customerInfo || !products)
		return (
			<SafeAreaView>
				<Center>
					<Spinner />
				</Center>
			</SafeAreaView>
		);

	const removeAdsProduct = products.find(
		(product) => product.identifier === REMOVE_ADS_PRODUCT_ID
	);

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
					{!hideRemoveAdsButton && (
						<>
							<Divider />
							<Button>
								<ButtonText style={fontWeightStyles.medium}>
									Remove ads for{" "}
									{removeAdsProduct?.priceString}
								</ButtonText>
							</Button>
						</>
					)}
				</VStack>
				<ProductsGrid />
				<BackButton />
			</Box>
		</SafeAreaView>
	);
}
