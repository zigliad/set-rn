import {
	APIKeys,
	LEGACY_PREMIUM_PRODUCT_ID,
	REMOVE_ADS_PRODUCT_ID,
} from "@/hooks/shop/useProducts";
import { StorageKey, storeData } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { CustomerInfo } from "react-native-purchases";

export const purchasedRemoveAds = (customerInfo: CustomerInfo) => {
	return (
		customerInfo.allPurchasedProductIdentifiers.includes(
			REMOVE_ADS_PRODUCT_ID
		) ||
		customerInfo.allPurchasedProductIdentifiers.includes(
			LEGACY_PREMIUM_PRODUCT_ID
		)
	);
};

const updateAdsRemoved = async (customerInfo: CustomerInfo) => {
	storeData(StorageKey.adsRemoved, String(+purchasedRemoveAds(customerInfo)));
};

export const useCustomerInfo = () => {
	const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();

	useEffect(() => {
		const setup = async () => {
			Purchases.configure({
				apiKey: Platform.OS === "ios" ? APIKeys.apple : APIKeys.google,
			});
			const info = await Purchases.getCustomerInfo();
			setCustomerInfo(info);
			updateAdsRemoved(info);
		};

		setup().catch(console.error);
	}, []);

	return { customerInfo };
};
