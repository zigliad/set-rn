import { Price } from "@/types/price";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { PurchasesStoreProduct } from "react-native-purchases";

export const APIKeys = {
	apple: "appl_emsJrqniTudiHIFlRjHRJMyvoFv",
	google: "",
};

export const LEGACY_PREMIUM_PRODUCT_ID = "com.zigdonliad.Sets.premium";
export const REMOVE_ADS_PRODUCT_ID = "remove_ads";

export const NON_CONSUMABLE_PRODUCT_IDS = [
	LEGACY_PREMIUM_PRODUCT_ID,
	REMOVE_ADS_PRODUCT_ID,
];

export const CONSUMABLE_PRODUCTS: Record<
	string,
	Price & { index: number; badge?: string }
> = {
	coins_tier_1: { coins: 100, index: 0 }, // 1$
	coins_tier_2: { coins: 330, badge: "10% Bonus", index: 20 }, // 3$, +10%
	coins_tier_3: { coins: 600, badge: "20% Bonus", index: 40 }, // 5$, +20%
	coins_tier_4: { coins: 1300, badge: "30% Bonus", index: 60 }, // 10$, +30%
	gems_tier_1: { gems: 7, index: 10 }, // 1$
	gems_tier_2: { gems: 23, badge: "10% Bonus", index: 30 }, // 3$, +10%
	gems_tier_3: { gems: 42, badge: "20% Bonus", index: 50 }, // 5$, +20%
	gems_tier_4: { gems: 91, badge: "30% Bonus", index: 70 }, // 10$, +30%
	coins_and_gems_tier_1: {
		coins: 330,
		gems: 15,
		badge: "10% Bonus",
		index: 80,
	}, // 5$, +10%
	coins_and_gems_tier_2: {
		coins: 720,
		gems: 33,
		badge: "20% Bonus",
		index: 90,
	}, // 10$, +20%
};

export const useProducts = (identifiers: string[]) => {
	const [products, setProducts] = useState<PurchasesStoreProduct[]>();

	useEffect(() => {
		const setup = async () => {
			Purchases.configure({
				apiKey: Platform.OS === "ios" ? APIKeys.apple : APIKeys.google,
			});
			const products = await Purchases.getProducts(identifiers);
			setProducts(products);
		};

		Purchases.setDebugLogsEnabled(true);

		setup().catch(console.log);
	}, [identifiers]);

	return { products };
};

export const useConsumableProducts = () => {
	const [products, setProducts] = useState<PurchasesStoreProduct[]>();

	useEffect(() => {
		const setup = async () => {
			Purchases.configure({
				apiKey: Platform.OS === "ios" ? APIKeys.apple : APIKeys.google,
			});
			const products = await Purchases.getProducts(
				Object.keys(CONSUMABLE_PRODUCTS)
			);
			setProducts(
				[...products].sort(
					(p1, p2) =>
						CONSUMABLE_PRODUCTS[p1.identifier].index -
						CONSUMABLE_PRODUCTS[p2.identifier].index
				)
			);
		};

		Purchases.setDebugLogsEnabled(true);

		setup().catch(console.log);
	}, []);

	return { products };
};
