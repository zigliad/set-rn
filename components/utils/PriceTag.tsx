import SetCurrency from "@/assets/images/other/set_currency.svg";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Coins } from "lucide-react-native";
import React from "react";

export const PriceTag = ({
	price,
	fontSize = 20,
	currencySize = 20,
	reverseColors = false,
}: {
	price: number;
	fontSize?: number;
	currencySize?: number;
	reverseColors?: boolean;
}) => {
	return (
		<HStack className="items-center" space="lg">
			{/* <SetCurrency width={currencySize} height={currencySize} /> */}
			<Icon
				as={Coins}
				style={{ height: currencySize, width: currencySize }}
			/>
			<Text
				size="5xl"
				className={reverseColors ? "text-typography-0" : ""}
				style={{
					fontSize: fontSize,
					fontFamily: "PlayfairDisplay_Black",
				}}
			>
				{price.toLocaleString()}
			</Text>
		</HStack>
	);
};
