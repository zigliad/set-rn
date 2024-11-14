import {
	AppOpenAd,
	InterstitialAd,
	TestIds,
} from "react-native-google-mobile-ads";

export const GAMES_UNTIL_AD = 2;

export const adUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: "ca-app-pub-4427652774441300/7289515970";
// ca-app-pub-4427652774441300/7289515970

export const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
	keywords: ["fashion", "clothing"],
});

// const appOpenAdUnitId = __DEV__
// 	? TestIds.APP_OPEN
// 	: "ca-app-pub-4427652774441300/1547316776";
// // ca - app - pub - 4427652774441300 / 1547316776;

// const appOpenAd = AppOpenAd.createForAdRequest(appOpenAdUnitId, {
// 	keywords: ["fashion", "clothing"],
// });

// // Preload an app open ad
// appOpenAd.load();

// // Show the app open ad when user brings the app to the foreground.
// appOpenAd.show();
