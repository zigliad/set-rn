import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import React from "react";
import SetCurrency from "@/assets/images/other/set_currency.svg";

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
		<HStack className="items-center">
			<SetCurrency width={currencySize} height={currencySize} />
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
