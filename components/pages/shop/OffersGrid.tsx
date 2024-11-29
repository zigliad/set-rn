import { ElevatedCard } from "@/components/ElevatedCard";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { useCurrencies } from "@/hooks/useCurrencies";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";

const offers = [
	{
		name: "Starter Pack",
		coins: 100,
		gems: 0,
		price: "0.99$",
	},
	{
		name: "Gem Duo",
		coins: 0,
		gems: 2,
		price: "0.99$",
	},
	{
		name: "Shiny Boost",
		coins: 350,
		gems: 1,
		price: "2.99$",
	},
	{
		name: "Gem Hoarder",
		coins: 50,
		gems: 7,
		price: "2.99$",
	},
	{
		name: "Coin Craze",
		coins: 600,
		gems: 2,
		price: "4.99$",
	},
	{
		name: "Treasure Trove",
		coins: 100,
		gems: 12,
		price: "4.99$",
	},
];

export const OffersGrid = ({}: {}) => {
	const { coins, gems } = useCurrencies();

	return (
		<FlatGrid
			className="w-2/3"
			maxItemsPerRow={2}
			spacing={12}
			data={offers}
			renderItem={({ item: offer }) => {
				return (
					<ElevatedCard key={offer.name} className={"relative"}>
						<TouchableOpacity
							onPress={() => {
								playSound(sounds.click);
							}}
						>
							<HStack className="justify-between items-center w-full">
								<VStack space="sm" className="p-4 pt-2 w-full">
									<VStack
										className="justify-between"
										space="xs"
									>
										<Text
											size="md"
											className="text-secondary-600"
											style={fontWeightStyles.regular}
										>
											{offer.price}
										</Text>
										<Text
											size="3xl"
											style={fontWeightStyles.medium}
										>
											{offer.name}
										</Text>
									</VStack>
									<Divider className="my-0.5 w-1/3" />
									<HStack
										className={
											"w-full " +
											(offer.coins > 0
												? "justify-between"
												: "justify-end")
										}
									>
										{offer.coins > 0 && (
											<PriceTag
												space="sm"
												currency="coin"
												price={offer.coins}
												fontSize={24}
												currencySize={32}
												dir="ltr"
											/>
										)}
										{offer.gems > 0 && (
											<PriceTag
												space="sm"
												currency="gem"
												price={offer.gems}
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
