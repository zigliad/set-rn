import {
	InterstitialAd,
	RewardedAd,
	TestIds,
} from "react-native-google-mobile-ads";

export const GAMES_UNTIL_AD = 2;

export const interstitialAdUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: "ca-app-pub-4427652774441300/7289515970";
// ca-app-pub-4427652774441300/7289515970

export const interstitial = InterstitialAd.createForAdRequest(
	interstitialAdUnitId,
	{
		keywords: ["fashion", "clothing"],
	}
);

export const rewardedAdUnitId = __DEV__
	? TestIds.REWARDED
	: "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

export const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
	keywords: ["fashion", "clothing"],
});
