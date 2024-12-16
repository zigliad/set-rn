import Card from "@/bl/card/Card";
import { ElevatedCard } from "@/components/ElevatedCard";
import { Center } from "@/components/ui/center";
import { Sound } from "@/constants/sounds";
import { useColors } from "@/hooks/useInitColors";
import { playSound } from "@/utils/soundPlayer";
import cardsSvgs from "@/utils/svgsLoader";
import React, { DispatchWithoutAction, useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import { BaseButton } from "react-native-gesture-handler";

const date = new Date(); // Current date
const dayOfMonth = date.getDate();

type InnerPlayingCardProps = {
	card: Card;
	picked?: boolean;
	size: { width: number | "100%"; height: number | "100%" };
};

const InnerPlayingCard = ({
	card,
	picked = false,
	size,
}: InnerPlayingCardProps) => {
	const { currentPalette: palette } = useColors();
	const colors = palette.colors;
	const cardString = card.attributes
		.map((attr) => `${attr + 1}`)
		.reduce((a1, a2) => a1 + a2, "");
	const color =
		cardString.length >= 4
			? colors[+cardString.charAt(3) - 1]
			: colors[dayOfMonth % colors.length];
	const imageCardString = cardString.slice(0, 3); // For the image, ignore the color attribute
	const CardImage = cardsSvgs[imageCardString];
	const borderColor =
		cardString.length >= 5 ? colors[+cardString.charAt(4) - 1] : undefined;

	const scale = useRef(new Animated.Value(0.75)).current;
	useEffect(() => {
		Animated.spring(scale, {
			toValue: picked ? 0.75 : 1,
			useNativeDriver: true,
			speed: 60,
			bounciness: 0,
		}).start();
	}, [picked]);

	return (
		<Animated.View
			style={[
				{
					transform: [{ scale }],
				},
			]}
		>
			<ElevatedCard
				className={"flex items-center justify-center rounded-xl"}
				style={{
					...size,
					...(borderColor &&
						Platform.OS === "ios" && {
							borderLeftColor: borderColor,
							borderBottomColor: borderColor,
						}),
				}}
				borderColor={
					Platform.OS === "android" ? borderColor : undefined
				}
			>
				<Center
					className="w-full h-full"
					style={{ transform: [{ rotate: "90deg" }] }}
				>
					<CardImage
						fill={color}
						stroke={color}
						height={size.width}
						width={size.height}
					/>
				</Center>
			</ElevatedCard>
		</Animated.View>
	);
};

export const PlayingCard = ({
	onPress,
	...props
}: InnerPlayingCardProps & {
	onPress?: DispatchWithoutAction;
}) =>
	onPress ? (
		<BaseButton
			rippleColor={"#00000000"}
			exclusive={false}
			onPress={async () => {
				if (onPress) {
					playSound(Sound.click);
					onPress();
				}
			}}
		>
			<InnerPlayingCard {...props} />
		</BaseButton>
	) : (
		<InnerPlayingCard {...props} />
	);
