import { GridAction, GridActions } from "@/components/GridActions";
import { OnboardingModal } from "@/components/pages/index/OnboardingModal";
import { StatsModal } from "@/components/StatsModal";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { useShowOnboarding } from "@/hooks/useShowOnboarding";
import { useStorageState } from "@/hooks/useStorageState";
import { Modes } from "@/modes/modes";
import { modesConfig } from "@/modes/modesConfig";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { ImageURISource, SafeAreaView, StyleSheet, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export const titleStyles = StyleSheet.create({
	pageTitle: {
		zIndex: 0,
		fontFamily: "PlayfairDisplay_Black",
		fontSize: 130,
		textShadowColor: "#aaa",
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 0,
	},
});

export default function Index() {
	const confettiRef = useRef<ConfettiCannon | null>(null);
	const [visibleStatsModal, setVisibleStatsModal] = useState(false);
	const { visibleModal: visibleOnboardingModal, finishOnboarding } =
		useShowOnboarding();

	const moreOptions: GridAction[] = useMemo(
		() => [
			{
				title: "Stats",
				Icon: require("@/assets/images/grid-action-icons/medal.png"),
				onClick: () => {
					setVisibleStatsModal(true);
				},
			},
			{
				title: "More",
				Icon: require("@/assets/images/grid-action-icons/more.png"),
				onClick: () => {
					router.push({ pathname: "/more" });
				},
			},
		],
		[]
	);

	const gridActions: GridAction[] = useMemo(
		() =>
			modesConfig
				.map((modeConf) => {
					const conf: {
						title: string;
						mode?: Modes;
						Icon: ImageURISource;
					} = { ...modeConf };
					delete conf.mode;
					return {
						...conf,
						onClick: () => {
							router.push({
								pathname: "/game",
								params: {
									mode: modeConf.mode,
								},
							});
						},
					};
				})
				.concat(moreOptions),
		[moreOptions]
	);

	return (
		<SafeAreaView className="bg-background-base">
			<View className="relative">
				<Heading
					className="absolute top-8 left-8"
					size="5xl"
					style={titleStyles.pageTitle}
				>
					SET
				</Heading>
				<HStack className="w-5/6 self-end">
					<GridActions actions={gridActions} />
				</HStack>
				{visibleStatsModal && (
					<StatsModal
						visible={visibleStatsModal}
						onResolve={() => setVisibleStatsModal(false)}
					/>
				)}
				{/* <ConfettiCannon
					ref={confettiRef}
					count={40}
					autoStartDelay={0}
					fallSpeed={5000}
					origin={{ x: -10, y: -10 }}
					colors={colors}
					explosionSpeed={1000}
					fadeOut
					onAnimationEnd={() => confettiRef.current?.start()}
				/> */}
			</View>
			<OnboardingModal
				visible={visibleOnboardingModal}
				onResolve={finishOnboarding}
			/>
		</SafeAreaView>
	);
}
