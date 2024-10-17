import React, { DispatchWithoutAction } from "react";

import Card from "@/bl/card/Card";
import { ElevatedCard } from "@/components/ElevatedCard";
import { useSetColors } from "@/hooks/useSetsColors";

import { Center } from "@/components/ui/center";
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
	onPress: DispatchWithoutAction;
	size: { width: number; height: number };
}) => {
	const { colors } = useSetColors();
	const cardString = card.attributes
		.map((attr) => `${attr + 1}`)
		.reduce((a1, a2) => a1 + a2, "");

	const color = colors[+cardString.charAt(3) - 1];
	const imageCardString = cardString.slice(0, 3); // For the image, ignore the color attribute
	const CardImage = cardsSvgs[imageCardString];

	// const borderColor =
	// 	cardString.length >= 5
	// 		? colors[+cardString.charAt(4) - 1]
	// 		: "transparent";

	return (
		<Pressable onPress={onPress}>
			<ElevatedCard
				key={cardString}
				className={
					"flex items-center justify-center rounded-xl transform transition-all scale-100 " +
					(picked ? "scale-75" : "")
				}
				style={{ ...size }}
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
		</Pressable>
	);
};
