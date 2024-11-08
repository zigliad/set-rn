import Card from "@/bl/card/Card";
import { PlayingCard } from "@/components/pages/game/PlayingCard";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Icon } from "@/components/ui/icon";

const styles = StyleSheet.create({
	title: {
		fontFamily: "PlayfairDisplay_Bold",
		fontSize: 80,
		textShadowColor: "#aaa",
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 0,
	},
	explanation: {
		fontFamily: "PlayfairDisplay_Medium",
		fontSize: 24,
	},
	cardWrapper: { height: "32%" },
	card: {
		width: 180,
		height: "100%",
	},
});

const rulesConfig = [
	{
		title: "Card",
		explanation: [
			"Every card has 4 features: Color, Symbol, Number and Shading.",
			"Every feature has 3 options. As a result, there are 81 unique cards.",
		],
		cards: [
			new Card([0, 2, 0, 0]),
			new Card([1, 1, 2, 1]),
			new Card([2, 0, 1, 2]),
		],
	},
	{
		title: "Set",
		explanation: [
			"A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on each card.",
			"Let's see some examples of valid sets...",
		],
	},
	{
		title: "Valid I",
		explanation: [
			"All three cards are the same color;",
			"all are ovals;",
			"all have two symbols;",
			"and all have different shadings.",
		],
		cards: [
			new Card([1, 0, 1, 1]),
			new Card([1, 1, 1, 1]),
			new Card([1, 2, 1, 1]),
		],
	},
	{
		title: "Valid II",
		explanation: [
			"All have different colors;",
			"all have different symbols;",
			"all have different numbers of symbols;",
			"and all have the same shadings.",
		],
		cards: [
			new Card([0, 1, 2, 2]),
			new Card([1, 1, 1, 0]),
			new Card([2, 1, 0, 1]),
		],
	},
	{
		title: "Valid III",
		explanation: [
			"All have different colors;",
			"all have different symbols;",
			"all have different numbers of symbols;",
			"and all have different shadings.",
		],
		cards: [
			new Card([0, 1, 1, 1]),
			new Card([1, 2, 0, 2]),
			new Card([2, 0, 2, 0]),
		],
	},
	{
		title: "Invalid",
		explanation: ["Let's see some examples of invalid sets..."],
	},
	{
		title: "Invalid I",
		explanation: [
			"All have different colors;",
			"all are diamonds;",
			"all have one symbol;",
			"however, two are open and one is not.",
		],
		cards: [
			new Card([0, 2, 0, 0]),
			new Card([0, 0, 0, 1]),
			new Card([0, 0, 0, 2]),
		],
	},
	{
		title: "Invalid II",
		explanation: [
			"All are squiggles;",
			"all have different shadings;",
			"all have two symbols;",
			"however, two are of the same color and one is not.",
		],
		cards: [
			new Card([1, 2, 2, 1]),
			new Card([1, 1, 2, 1]),
			new Card([1, 0, 2, 0]),
		],
	},
	{
		title: "The Magic Rule",
		explanation: ["If two are... and one is not, then it is not a set!"],
	},
];

export default function Rules() {
	const [stage, setStage] = useState(0);
	const rule = rulesConfig[stage];

	return (
		<SafeAreaView className="bg-background-base">
			<HStack className="justify-between pt-4" space={"md"}>
				<VStack className="flex-1 p-4" space={"md"}>
					<Heading size="5xl" style={styles.title}>
						{rule.title}
					</Heading>
					<VStack className="pl-4" space="md">
						{rule.explanation.map((txt) => (
							<Text style={styles.explanation} key={txt}>
								{txt}
							</Text>
						))}
					</VStack>
					<Button
						className="absolute bottom-0 left-0 rounded-full bg-background-800 shadow-xl"
						onPress={async () => {
							if (stage === rulesConfig.length - 1) router.back();
							else setStage((s) => s + 1);
						}}
					>
						<Icon
							as={ArrowLeft}
							className={"w-6 h-6 text-typography-0"}
						/>
					</Button>
				</VStack>
				{rule.cards && (
					<VStack className="">
						<Center className="h-full flex flex-col justify-between">
							{rule.cards.map((card) => (
								<Center
									style={styles.cardWrapper}
									key={card.toString()}
								>
									<PlayingCard
										card={card}
										size={styles.card}
									/>
								</Center>
							))}
						</Center>
					</VStack>
				)}
			</HStack>
		</SafeAreaView>
	);
}
