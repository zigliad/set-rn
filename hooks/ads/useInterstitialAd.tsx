import { useCallback, useEffect, useState } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

export const useInterstitialAd = (interstitial: InterstitialAd) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const unsubscribeLoaded = interstitial.addAdEventListener(
			AdEventType.LOADED,
			() => {
				setLoaded(true);
			}
		);

		const unsubscribeClosed = interstitial.addAdEventListener(
			AdEventType.CLOSED,
			() => {
				setLoaded(false);
				interstitial.load();
			}
		);

		// Start loading the interstitial straight away
		interstitial.load();

		// Unsubscribe from events on unmount
		return () => {
			unsubscribeLoaded();
			unsubscribeClosed();
		};
	}, [interstitial]);

	const showAdIfLoaded = useCallback(() => {
		if (loaded) {
			interstitial.show();
		}
	}, [loaded, interstitial]);

	return { showAdIfLoaded, loaded };
};
