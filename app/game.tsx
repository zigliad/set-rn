import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { GameBar } from "@/components/pages/game/GameBar";
import { GameGrid } from "@/components/pages/game/GameGrid";
import { HStack } from "@/components/ui/hstack";
import { sounds } from "@/constants/sounds";
import { useInterstitialAd } from "@/hooks/ads/useInterstitialAd";
import { modes, Modes } from "@/modes/modes";
import { ModeContext } from "@/modes/modesContext";
import { GameResult } from "@/modes/modeTypes";
import { playSound } from "@/utils/soundPlayer";
import { getData, StorageKey, storeData } from "@/utils/storage";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { InterstitialAd, TestIds } from "react-native-google-mobile-ads";
import useList from "react-use/lib/useList";
import useMount from "react-use/lib/useMount";

const GAMES_UNTIL_AD = 2;

const adUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
	keywords: ["fashion", "clothing"],
});

export default function Game() {
	const { mode } = useLocalSearchParams<{ mode: Modes }>();
	const useChosenMode = modes[mode];

	const { showAdIfLoaded, loaded } = useInterstitialAd(interstitial);

	const onGameEnd = useCallback(
		async (gameResult?: GameResult) => {
			const gamesPlayedWithoutAds =
				(await getData(StorageKey.gamesPlayedWithoutAds)) ?? 0;
			console.log(gamesPlayedWithoutAds);
			let newGamesPlayWithoutAds =
				(+gamesPlayedWithoutAds + 1) % GAMES_UNTIL_AD;
			await storeData(
				StorageKey.gamesPlayedWithoutAds,
				String(newGamesPlayWithoutAds)
			);
			if (newGamesPlayWithoutAds === 0) setTimeout(showAdIfLoaded, 500);

			setVisibleModal(true);
			await playSound(
				gameResult === GameResult.lose ? sounds.lose : sounds.win
			);
		},
		[showAdIfLoaded]
	);

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
						await playSound(sounds.restart);
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
