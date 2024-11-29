import { GridAction, GridActions } from "@/components/GridActions";
import { BuyModeModal } from "@/components/pages/index/BuyModeModal";
import { OnboardingModal } from "@/components/pages/index/OnboardingModal";
import { StatsModal } from "@/components/StatsModal";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { sounds } from "@/constants/sounds";
import { useMyModes } from "@/hooks/ads/useMyModes";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useShowOnboarding } from "@/hooks/useShowOnboarding";
import { Modes } from "@/modes/modes";
import {
	DEFAULT_MODE_PRICE,
	ModeConfig,
	modesConfig,
} from "@/modes/modesConfig";
import { medalConfig } from "@/types/medal";
import { playSound } from "@/utils/soundPlayer";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { ImageURISource, SafeAreaView, StyleSheet, View } from "react-native";

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
							if (
								gems >=
									(modeConf.price?.gems ??
										DEFAULT_MODE_PRICE.gems ??
										0) &&
								coins >=
									(modeConf.price?.coins ??
										DEFAULT_MODE_PRICE.coins ??
										0)
							) {
								playSound(sounds.click);
								setModeClicked(modeConf);
							} else {
								playSound(sounds.error);
								router.push("/shop");
							}
						},
					};
				}
			);
			setGridActions([...(await Promise.all(_promises)), ...moreOptions]);
		})();
	}, [moreOptions, myModes, gems, coins]);

	return (
		<SafeAreaView className="bg-background-base">
			<View className="relative">
				<VStack className="absolute top-8 left-8">
					<Heading size="5xl" style={titleStyles.pageTitle}>
						SET
					</Heading>
					<PriceTag
						price={gems}
						currency="gem"
						fontSize={24}
						currencySize={32}
						space="md"
					/>
				</VStack>
				<HStack className="w-5/6 self-end">
					<GridActions actions={gridActions} />
				</HStack>
				{visibleStatsModal && (
					<StatsModal
						visible={visibleStatsModal}
						onResolve={() => setVisibleStatsModal(false)}
					/>
				)}
			</View>
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
		</SafeAreaView>
	);
}
