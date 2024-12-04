// import { Price } from "@/types/price";
// import { useEffect, useState } from "react";
// import { Platform } from "react-native";

// import Purchases, { PurchasesStoreProduct } from "react-native-purchases";

// export const APIKeys = {
// 	apple: "appl_emsJrqniTudiHIFlRjHRJMyvoFv",
// 	google: "",
// };

// export const LEGACY_PREMIUM_PRODUCT_ID = "com.zigdonliad.Sets.premium";
// export const REMOVE_ADS_PRODUCT_ID = "remove_ads";

// export const NON_CONSUMABLE_PRODUCT_IDS = [
// 	LEGACY_PREMIUM_PRODUCT_ID,
// 	REMOVE_ADS_PRODUCT_ID,
// ];

// export const CONSUMABLE_PRODUCTS: Record<string, Price> = {
// 	coins_tier_1: { coins: 100 },
// 	coins_tier_2: { coins: 350 },
// 	gems_tier_1: { gems: 7 },
// 	gems_tier_2: { gems: 22 },
// };

// export const useProducts = (identifiers: string[]) => {
// 	const [products, setProducts] = useState<PurchasesStoreProduct[]>();

// 	useEffect(() => {
// 		const setup = async () => {
// 			Purchases.configure({
// 				apiKey: Platform.OS === "ios" ? APIKeys.apple : APIKeys.google,
// 			});
// 			const products = await Purchases.getProducts(identifiers);
// 			setProducts(products);
// 		};

// 		Purchases.setDebugLogsEnabled(true);

// 		setup().catch(console.log);
// 	}, [identifiers]);

// 	return { products };
// };

// export const useConsumableProducts = () => {
// 	const [products, setProducts] = useState<PurchasesStoreProduct[]>();

// 	useEffect(() => {
// 		const setup = async () => {
// 			Purchases.configure({
// 				apiKey: Platform.OS === "ios" ? APIKeys.apple : APIKeys.google,
// 			});
// 			const products = await Purchases.getProducts(
// 				Object.keys(CONSUMABLE_PRODUCTS)
// 			);
// 			setProducts(
// 				[...products]
// 					.sort(
// 						(p1, p2) =>
// 							(CONSUMABLE_PRODUCTS[p1.identifier].coins ?? 0) -
// 							(CONSUMABLE_PRODUCTS[p2.identifier].coins ?? 0)
// 					)
// 					.sort(
// 						(p1, p2) =>
// 							(CONSUMABLE_PRODUCTS[p1.identifier].gems ?? 0) -
// 							(CONSUMABLE_PRODUCTS[p2.identifier].gems ?? 0)
// 					)
// 			);
// 		};

// 		Purchases.setDebugLogsEnabled(true);

// 		setup().catch(console.log);
// 	}, []);

// 	return { products };
// };
