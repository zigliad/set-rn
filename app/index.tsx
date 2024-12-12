import { DailyRewardModal } from "@/components/daily-reward-modal/DailyRewardModal";
import { GridAction, GridActions } from "@/components/GridActions";
import { BuyModeModal } from "@/components/pages/index/BuyModeModal";
import { OnboardingModal } from "@/components/pages/index/OnboardingModal";
import { StatsModal } from "@/components/StatsModal";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { useMyModes } from "@/hooks/ads/useMyModes";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useShowOnboarding } from "@/hooks/useShowOnboarding";
import { Modes } from "@/modes/modes";
import { ModeConfig, modesConfig } from "@/modes/modesConfig";
import { fontWeightStyles } from "@/styles/commonStyles";
import { medalConfig } from "@/types/medal";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { ImageURISource, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const titleStyles = StyleSheet.create({
	pageTitle: {
		zIndex: 0,
		fontFamily: fontWeightStyles.black.fontFamily,
		fontSize: 130,
		textShadowColor: "#aaa",
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 0,
	},
});

export default function Index() {
	const [visibleStatsModal, setVisibleStatsModal] = useState(false);
	const { visibleModal: visibleOnboardingModal, finishOnboarding } =
		useShowOnboarding();

	const [modeClicked, setModeClicked] = useState<ModeConfig>();
	const { gems, coins } = useCurrencies();
	const { myModes } = useMyModes();

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

	const [gridActions, setGridActions] = useState<GridAction[]>([]);

	useEffect(() => {
		(async () => {
			const _promises: Promise<GridAction>[] = modesConfig.map(
				async (modeConf) => {
					const conf: {
						title: string;
						mode?: Modes;
						Icon: ImageURISource;
					} = { ...modeConf };
					delete conf.mode;

					let medalConf;
					const medal = await modeConf.getMedal?.();
					if (medal) medalConf = medalConfig[medal];
					const hasMode = myModes.includes(modeConf.mode);

					return {
						...conf,
						disabled: !hasMode,
						leftIcon: medalConf,
						rightIcon: hasMode
							? undefined
							: { icon: Lock, color: "#aaaaaa" },
						onClick: () => {
							router.push({
								pathname: "/game",
								params: {
									mode: modeConf.mode,
								},
							});
						},
						onDisabledClick: () => {
							playSound(sounds.click);
							setModeClicked(modeConf);
						},
					};
				}
			);
			setGridActions([...(await Promise.all(_promises)), ...moreOptions]);
		})();
	}, [moreOptions, myModes, gems, coins]);

	return (
		<SafeAreaView>
			<View className="relative">
				<Box className="absolute top-8 left-8">
					<Text size="5xl" style={titleStyles.pageTitle}>
						SET
					</Text>
					<PriceTag
						price={gems}
						currency="gem"
						fontSize={36}
						currencySize={56}
						space="md"
					/>
				</Box>
				<HStack className="w-5/6 self-end">
					<GridActions actions={gridActions} />
				</HStack>
			</View>
			{visibleStatsModal && (
				<StatsModal
					visible={visibleStatsModal}
					onResolve={() => setVisibleStatsModal(false)}
				/>
			)}
			<BuyModeModal
				mode={modeClicked}
				onResolve={() => {
					setModeClicked(undefined);
				}}
			/>
			<OnboardingModal
				visible={visibleOnboardingModal}
				onResolve={finishOnboarding}
			/>
			<DailyRewardModal />
		</SafeAreaView>
	);
}
