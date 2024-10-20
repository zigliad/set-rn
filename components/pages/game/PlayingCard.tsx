import React, { DispatchWithoutAction } from "react";

import Card from "@/bl/card/Card";
import { ElevatedCard } from "@/components/ElevatedCard";
import { useColors } from "@/hooks/useInitColors";

import { Center } from "@/components/ui/center";
import { sounds } from "@/constants/sounds";
import { playSound } from "@/utils/soundPlayer";
import cardsSvgs from "@/utils/svgsLoader";
import { Pressable } from "react-native";

export const PlayingCard = ({
	card,
	picked = false,
	onPress,
	size,
}: {
	card: Card;
	picked?: boolean;
	onPress?: DispatchWithoutAction;
	size: { width: number | string; height: number | string };
}) => {
	const { colors } = useColors();
	const cardString = card.attributes
		.map((attr) => `${attr + 1}`)
		.reduce((a1, a2) => a1 + a2, "");

	const color = colors[+cardString.charAt(3) - 1];
	const imageCardString = cardString.slice(0, 3); // For the image, ignore the color attribute
	const CardImage = cardsSvgs[imageCardString];

	const borderColor =
		cardString.length >= 5
			? colors[+cardString.charAt(4) - 1]
			: "transparent";

	const CardComponent = (
		<ElevatedCard
			className={
				"flex items-center justify-center rounded-xl transform transition-all scale-100 " +
				(picked ? "scale-75" : "")
			}
			style={{
				...size,
				// borderLeftColor: borderColor,
				// borderBottomColor: borderColor,
			}}
		>
			<Center className="rotate-90 w-full h-full">
				<CardImage
					fill={color}
					stroke={color}
					height={size.width}
					width={size.height}
				/>
			</Center>
		</ElevatedCard>
	);

	return onPress ? (
		<Pressable
			onPress={async () => {
				if (onPress) {
					await playSound(sounds.click);
					onPress();
				}
			}}
		>
			{CardComponent}
		</Pressable>
	) : (
		CardComponent
	);
};
