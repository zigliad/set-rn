import SetCoin from "@/assets/images/currencies/coin.svg";
import SetGem from "@/assets/images/currencies/gem.svg";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { PropsOf } from "@/extra-types/utils/extra";
import { fontWeightStyles } from "@/styles/commonStyles";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const PriceTag = ({
	price,
	fontSize = 20,
	currencySize = 20,
	reverseColors = false,
	dir = "ltr",
	space = "lg",
	currency = "coin",
	spinAnimation = false,
	forceTailwindColor,
}: {
	price: number;
	fontSize?: number;
	currencySize?: number;
	reverseColors?: boolean;
	dir?: "ltr" | "rtl";
	space?: PropsOf<typeof HStack>["space"];
	currency?: "coin" | "gem";
	spinAnimation?: boolean;
	forceTailwindColor?: string;
}) => {
	const rotateValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Rotate animation
		Animated.loop(
			Animated.sequence([
				Animated.timing(rotateValue, {
					toValue: 1,
					duration: 1200,
					useNativeDriver: true,
					easing: Easing.linear,
				}),
				Animated.timing(rotateValue, {
					toValue: 2,
					duration: 1200,
					useNativeDriver: true,
					easing: Easing.linear,
				}),
			])
		).start();
	}, [rotateValue]);

	const rotateStyle = {
		transform: [
			{
				rotate: rotateValue.interpolate({
					inputRange: [0, 1],
					outputRange: ["0deg", "360deg"],
				}),
			},
		],
	};

	return (
		<HStack className="items-center" space={space}>
			{dir === "ltr" &&
				(currency === "coin" ? (
					<Animated.View style={[spinAnimation ? rotateStyle : null]}>
						<SetCoin width={currencySize} height={currencySize} />
					</Animated.View>
				) : (
					<Animated.View style={[spinAnimation ? rotateStyle : null]}>
						<SetGem
							width={currencySize / 2}
							height={currencySize}
							style={{ transform: [{ rotate: "20deg" }] }}
						/>
					</Animated.View>
				))}
			<Text
				size="5xl"
				className={
					reverseColors
						? "text-typography-0 "
						: forceTailwindColor
							? forceTailwindColor
							: ""
				}
				style={{
					fontSize: fontSize,
					fontFamily: fontWeightStyles.black.fontFamily,
				}}
			>
				{price?.toLocaleString() ?? ""}
			</Text>
			{dir === "rtl" &&
				(currency === "coin" ? (
					<Animated.View style={[spinAnimation ? rotateStyle : null]}>
						<SetCoin width={currencySize} height={currencySize} />
					</Animated.View>
				) : (
					<Animated.View style={[spinAnimation ? rotateStyle : null]}>
						<SetGem
							width={currencySize / 2}
							height={currencySize}
							style={{ transform: [{ rotate: "20deg" }] }}
						/>
					</Animated.View>
				))}
		</HStack>
	);
};
