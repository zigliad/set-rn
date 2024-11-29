import SetCoin from "@/assets/images/currencies/coin.svg";
import SetGem from "@/assets/images/currencies/gem.svg";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { PropsOf } from "@/extra-types/utils/extra";
import React from "react";

export const PriceTag = ({
	price,
	fontSize = 20,
	currencySize = 20,
	reverseColors = false,
	dir = "ltr",
	space = "lg",
	currency = "coin",
}: {
	price: number;
	fontSize?: number;
	currencySize?: number;
	reverseColors?: boolean;
	dir?: "ltr" | "rtl";
	space?: PropsOf<typeof HStack>["space"];
	currency?: "coin" | "gem";
}) => {
	return (
		<HStack className="items-center" space={space}>
			{dir === "ltr" &&
				(currency === "coin" ? (
					<SetCoin width={currencySize} height={currencySize} />
				) : (
					<SetGem width={currencySize / 2} height={currencySize} />
				))}
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
			{dir === "rtl" &&
				(currency === "coin" ? (
					<SetCoin width={currencySize} height={currencySize} />
				) : (
					<SetGem width={currencySize} height={currencySize} />
				))}
		</HStack>
	);
};
