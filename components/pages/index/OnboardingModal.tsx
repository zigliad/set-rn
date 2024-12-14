import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { Sound } from "@/constants/sounds";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { GraduationCap, HandMetal, Smile } from "lucide-react-native";
import React, { DispatchWithoutAction, useMemo, useState } from "react";

const color = "#FF0188";

export const OnboardingModal = ({
	visible = false,
	onResolve,
}: {
	visible?: boolean;
	onResolve?: DispatchWithoutAction;
}) => {
	const [stage, setStage] = useState(0);
	const onboardingStages = useMemo(
		() => [
			{
				header: "Welcome!",
				content: "Before we start, do you know the rules of 'SET'?",
				buttonText: "I Don't",
				secondaryButtonText: "I Do",
				color,
				icon: Smile,
				onResolve: () => setStage(1),
				secondaryOnResolve: () => setStage(2),
			},
			{
				header: "So,",
				content: "Would you like to do a very, very quick tutorial?",
				buttonText: "Yes Please!",
				secondaryButtonText: "Nahh",
				color,
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
					"You can access the tutorial anytime by navigating to More → Rules",
				buttonText: "Got It",
				color,
				icon: HandMetal,
				onResolve,
			},
		],
		[onResolve]
	);

	const modalStage = onboardingStages[stage];

	return (
		<AwesomeModal
			visible={visible}
			{...modalStage}
			onResolve={() => {
				playSound(Sound.click);
				modalStage.onResolve?.();
			}}
			secondaryOnResolve={() => {
				playSound(Sound.click);
				modalStage.secondaryOnResolve?.();
			}}
		/>
	);
};
