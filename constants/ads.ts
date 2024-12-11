import { Platform } from "react-native";
import {
	InterstitialAd,
	RewardedAd,
	TestIds,
} from "react-native-google-mobile-ads";

export const GAMES_UNTIL_AD = 2;

export const interstitialAdUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: Platform.OS === "ios"
		? "ca-app-pub-4427652774441300/7289515970"
		: "ca-app-pub-4427652774441300/4498645689";

export const interstitial =
	InterstitialAd.createForAdRequest(interstitialAdUnitId);

export const rewardedAdUnitId = __DEV__
	? TestIds.REWARDED
	: Platform.OS === "ios"
		? "ca-app-pub-4427652774441300/8541804224"
		: "ca-app-pub-4427652774441300/6230529757";

export const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId);
