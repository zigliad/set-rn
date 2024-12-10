import { ElevatedCard } from "@/components/ElevatedCard";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { SetState } from "@/extra-types/utils/extra";
import {
	CONSUMABLE_PRODUCTS,
	useConsumableProducts,
} from "@/hooks/shop/useProducts";
import { useCurrencies } from "@/hooks/useCurrencies";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import React from "react";
import { TouchableOpacity } from "react-native";
import Purchases from "react-native-purchases";
import { FlatGrid } from "react-native-super-grid";

export const ProductsGrid = ({
	setLoading,
}: {
	setLoading: SetState<boolean>;
}) => {
	const { incCoins, incGems } = useCurrencies();

	const { products } = useConsumableProducts();

	if (!products)
		return (
			<FlatGrid
				className="w-2/3"
				maxItemsPerRow={2}
				spacing={12}
				data={[1, 2, 3, 4, 5, 6, 7, 8]}
				renderItem={({ item }) => {
					return (
						<Skeleton
							key={item}
							speed={4}
							variant="sharp"
							className="w-full h-[150px] rounded-2xl"
						/>
					);
				}}
			/>
		);

	return (
		<FlatGrid
			className="w-2/3"
			maxItemsPerRow={2}
			spacing={12}
			data={products}
			renderItem={({ item: product }) => {
				const coins =
					CONSUMABLE_PRODUCTS[product.identifier].coins ?? 0;
				const gems = CONSUMABLE_PRODUCTS[product.identifier].gems ?? 0;
				const badge = CONSUMABLE_PRODUCTS[product.identifier].badge;
				return (
					<ElevatedCard
						key={product.identifier}
						className={"relative"}
					>
						<TouchableOpacity
							onPress={async () => {
								playSound(sounds.click);
								setLoading(true);
								try {
									await Purchases.purchaseStoreProduct(
										product
									);
									incGems(gems);
									incCoins(coins);
									playSound(sounds.buy);
								} catch (e) {
									console.error(e);
								}
								setLoading(false);
							}}
						>
							<HStack className="justify-between items-center w-full">
								<VStack space="sm" className="p-4 pt-2 w-full">
									<VStack
										className="justify-between"
										space="xs"
									>
										<HStack className="justify-between">
											<Text
												size="md"
												className="text-secondary-600"
												style={fontWeightStyles.regular}
											>
												{product.priceString}
											</Text>
											{badge && (
												<Box className="bg-green-500 rounded-md px-2">
													<Text
														size="md"
														className="color-typography-0"
														style={
															fontWeightStyles.regular
														}
													>
														{badge}
													</Text>
												</Box>
											)}
										</HStack>
										<Text
											size="2xl"
											style={fontWeightStyles.medium}
										>
											{product.title}
										</Text>
									</VStack>
									<Divider className="my-0.5 w-1/3" />
									<HStack
										className={
											"w-full " +
											(coins > 0
												? "justify-between"
												: "justify-end")
										}
									>
										{coins > 0 && (
											<PriceTag
												space="sm"
												currency="coin"
												price={coins}
												fontSize={24}
												currencySize={32}
												dir="ltr"
											/>
										)}
										{gems > 0 && (
											<PriceTag
												space="sm"
												currency="gem"
												price={gems}
												fontSize={24}
												currencySize={42}
												dir={"rtl"}
											/>
										)}
									</HStack>
								</VStack>
							</HStack>
						</TouchableOpacity>
					</ElevatedCard>
				);
			}}
		/>
	);
};
