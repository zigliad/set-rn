import Card from "@/bl/card/Card";
import { ElevatedCard } from "@/components/ElevatedCard";
import { Center } from "@/components/ui/center";
import { sounds } from "@/constants/sounds";
import { useColors } from "@/hooks/useInitColors";
import { playSound } from "@/utils/soundPlayer";
import cardsSvgs from "@/utils/svgsLoader";
import React, { DispatchWithoutAction } from "react";
import { BaseButton } from "react-native-gesture-handler";

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
	const { colors } = useColors();
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
};

export const PlayingCard = ({
	onPress,
	...props
}: InnerPlayingCardProps & {
	onPress?: DispatchWithoutAction;
}) =>
	onPress ? (
		<BaseButton
			exclusive={false}
			onPress={async () => {
				if (onPress) {
					await playSound(sounds.click);
					onPress();
				}
			}}
		>
			<InnerPlayingCard {...props} />
		</BaseButton>
	) : (
		<InnerPlayingCard {...props} />
	);
