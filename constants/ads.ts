import { InterstitialAd, TestIds } from "react-native-google-mobile-ads";

export const GAMES_UNTIL_AD = 2;

export const adUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";
// ca-app-pub-4427652774441300/7289515970

export const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
	keywords: ["fashion", "clothing"],
});
