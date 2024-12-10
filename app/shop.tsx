import { ProductsGrid } from "@/components/pages/shop/ProductsGrid";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { BackButton } from "@/components/utils/BackButton";
import { PriceTag } from "@/components/utils/PriceTag";
import { rewardedAdUnitId } from "@/constants/ads";
import { sounds } from "@/constants/sounds";
import {
	NON_CONSUMABLE_PRODUCT_IDS,
	REMOVE_ADS_PRODUCT_ID,
	useProducts,
} from "@/hooks/shop/useProducts";
import { useCurrencies } from "@/hooks/useCurrencies";
import { purchasedRemoveAds, useCustomerInfo } from "@/hooks/useCustomerInfo";
import { useStorageState } from "@/hooks/useStorageState";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { useEffect, useMemo, useState } from "react";
import { useRewardedAd } from "react-native-google-mobile-ads";
import Purchases from "react-native-purchases";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Shop() {
	const { coins, gems } = useCurrencies();
	const { isLoaded, isClosed, load, show, reward, isEarnedReward } =
		useRewardedAd(rewardedAdUnitId);

	const { customerInfo } = useCustomerInfo();
	const { products } = useProducts(NON_CONSUMABLE_PRODUCT_IDS);
	const [loading, setLoading] = useState(false);

	useEffect(load, [load]);

	const removeAdsProduct = useMemo(
		() =>
			products
				? products.find(
						(product) =>
							product.identifier === REMOVE_ADS_PRODUCT_ID
					)
				: undefined,
		[products]
	);

	const [adsRemoved, setAdsRemoved] = useStorageState(
		StorageKey.adsRemoved,
		String(0)
	);

	const didPurchaseRemoveAds = useMemo(
		() => (customerInfo ? purchasedRemoveAds(customerInfo) : true),
		[customerInfo]
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
						isDisabled={!isLoaded}
						onPress={() => {
							if (isLoaded) {
								playSound(sounds.click);
								show();
							}
						}}
					>
						<ButtonText style={fontWeightStyles.medium}>
							Watch ad for 10 coins
						</ButtonText>
					</Button>
					{!didPurchaseRemoveAds &&
						!adsRemoved &&
						removeAdsProduct && (
							<>
								<Divider />
								<Button
									onPress={async () => {
										playSound(sounds.click);
										setLoading(true);
										try {
											await Purchases.purchaseStoreProduct(
												removeAdsProduct
											);
											setAdsRemoved(String(1));
											playSound(sounds.buy);
										} catch (e) {
											console.error(e);
										}
										setLoading(false);
									}}
								>
									<ButtonText style={fontWeightStyles.medium}>
										Remove ads for{" "}
										{removeAdsProduct.priceString}
									</ButtonText>
								</Button>
							</>
						)}
					{loading && (
						<HStack className="px-1">
							<Spinner />
						</HStack>
					)}
				</VStack>
				<ProductsGrid {...{ setLoading }} />
				<BackButton />
			</Box>
		</SafeAreaView>
	);
}
