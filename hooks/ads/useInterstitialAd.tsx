import { useCallback, useEffect, useState } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

export const useInterstitialAd = (interstitial: InterstitialAd) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const unsubscribe = interstitial.addAdEventListener(
			AdEventType.LOADED,
			() => {
				setLoaded(true);
			}
		);

		// Start loading the interstitial straight away
		interstitial.load();

		// Unsubscribe from events on unmount
		return unsubscribe;
	}, []);

	const showAdIfLoaded = useCallback(() => {
		if (loaded) {
			interstitial.show();
			setLoaded(false);
			interstitial.load();
		}
	}, [loaded, interstitial, setLoaded]);

	return { showAdIfLoaded, loaded };
};
