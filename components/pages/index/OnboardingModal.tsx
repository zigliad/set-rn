import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { sounds } from "@/constants/sounds";
import { CLASSIC_PALETTE, useColors } from "@/hooks/useInitColors";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { GraduationCap, HandMetal, Smile } from "lucide-react-native";
import React, { DispatchWithoutAction, useMemo, useState } from "react";

export const OnboardingModal = ({
	visible = false,
	onResolve,
}: {
	visible?: boolean;
	onResolve?: DispatchWithoutAction;
}) => {
	const [stage, setStage] = useState(0);
	const { currentPalette } = useColors();
	const colors = currentPalette?.colors ?? CLASSIC_PALETTE.colors;
	const onboardingStages = useMemo(
		() => [
			{
				header: "Welcome!",
				content: "Before we start, do you know the rules of 'SET'?",
				buttonText: "I Don't",
				secondaryButtonText: "I Do",
				color: colors[1],
				icon: Smile,
				onResolve: () => setStage(1),
				secondaryOnResolve: () => setStage(2),
			},
			{
				header: "So,",
				content: "Would you like to do a very, very quick tutorial?",
				buttonText: "Yes Please!",
				secondaryButtonText: "Nahh",
				color: colors[1],
				icon: GraduationCap,
				onResolve: () => {
					onResolve?.();
					router.push("/rules");
				},
				secondaryOnResolve: () => setStage(2),
			},
			{
				header: "Have Fun!",
				content:
					"Just know that you can access the tutorial at any point, by clicking: More -> Rules.",
				buttonText: "Got It",
				color: colors[1],
				icon: HandMetal,
				onResolve,
			},
		],
		[currentPalette, onResolve]
	);

	const modalStage = onboardingStages[stage];

	return (
		<AwesomeModal
			visible={visible}
			{...modalStage}
			onResolve={() => {
				playSound(sounds.click);
				modalStage.onResolve?.();
			}}
			secondaryOnResolve={() => {
				playSound(sounds.click);
				modalStage.secondaryOnResolve?.();
			}}
		/>
	);
};
