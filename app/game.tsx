import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { GameBar } from "@/components/pages/game/GameBar";
import { GameGrid } from "@/components/pages/game/GameGrid";
import { HStack } from "@/components/ui/hstack";
import { GAMES_UNTIL_AD, interstitial } from "@/constants/ads";
import { Sound } from "@/constants/sounds";
import { useInterstitialAd } from "@/hooks/ads/useInterstitialAd";
import { modes, Modes } from "@/modes/modes";
import { ModeContext } from "@/modes/modesContext";
import { GameResult } from "@/modes/modeTypes";
import { playSound } from "@/utils/soundPlayer";
import { getData, StorageKey, storeData } from "@/utils/storage";
import { useLocalSearchParams } from "expo-router";
import * as StoreReview from "expo-store-review";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useList from "react-use/lib/useList";
import useMount from "react-use/lib/useMount";

export default function Game() {
	const { showAdIfLoaded } = useInterstitialAd(interstitial);

	const onGameEnd = useCallback(
		// Check if an ad should be displayed and ask for review when its time.
		async (gameResult?: GameResult) => {
			const adsRemoved = await getData(StorageKey.adsRemoved, String(0));
			const gamesPlayedWithoutAds = await getData(
				StorageKey.gamesPlayedWithoutAds,
				String(0)
			);
			const totalSetsFound = await getData(
				StorageKey.totalSetsFound,
				String(0)
			);
			const reviewRequestsCount = await getData(
				StorageKey.reviewRequestsCount,
				String(0)
			);

			const newGamesPlayWithoutAds =
				(+gamesPlayedWithoutAds + 1) % GAMES_UNTIL_AD;

			if (
				((+totalSetsFound >= 100 && +reviewRequestsCount === 0) ||
					(+totalSetsFound >= 400 && +reviewRequestsCount === 1)) &&
				(await StoreReview.isAvailableAsync()) &&
				(await StoreReview.hasAction())
			) {
				storeData(
					StorageKey.reviewRequestsCount,
					+reviewRequestsCount + 1
				);
				await StoreReview.requestReview();
			} else if (!+adsRemoved && newGamesPlayWithoutAds === 0) {
				setTimeout(() => {
					const adShown = showAdIfLoaded();
					if (adShown)
						storeData(StorageKey.gamesPlayedWithoutAds, String(0));
				}, 500);
			}

			setVisibleModal(true);
			playSound(gameResult === GameResult.lose ? Sound.lose : Sound.win);
		},
		[showAdIfLoaded]
	);

	const { mode } = useLocalSearchParams<{ mode: Modes }>();
	const useChosenMode = modes[mode];
	const modeData = useChosenMode(onGameEnd);
	useMount(modeData.newGame);

	const [visibleModal, setVisibleModal] = useState(false);
	const [picked, { push, removeAt, reset }] = useList<number>([]);
	const [dummyPicked, { set: dummySet, reset: dummyReset }] = useList<number>(
		[]
	);

	return (
		<SafeAreaView className="bg-background-base w-full h-full">
			<ModeContext.Provider value={modeData}>
				<HStack
					className="h-full w-full pt-4 pb-2 flex justify-center items-center"
					space="lg"
				>
					<GameGrid
						{...{
							picked,
							push,
							removeAt,
							reset,
							dummyPicked,
							dummyReset,
							dummySet,
						}}
					/>
					<GameBar resetPicked={reset} dummyReset={dummyReset} />
				</HStack>
				<AwesomeModal
					visible={visibleModal}
					onResolve={async () => {
						setVisibleModal(false);
						modeData.newGame();
						reset();
						dummyReset();
						playSound(Sound.restart);
					}}
					header={modeData.endgameTitle}
					content={modeData.endgameContent}
					type={
						modeData.gameResult === GameResult.lose
							? "error"
							: "success"
					}
					buttonText={"Play Again"}
				/>
			</ModeContext.Provider>
		</SafeAreaView>
	);
}
