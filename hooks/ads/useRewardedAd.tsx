import { Action1 } from "@/extra-types/utils/functions";
import { useCallback, useEffect, useState } from "react";
import {
	RewardedAd,
	RewardedAdEventType,
	RewardedAdReward,
} from "react-native-google-mobile-ads";

export const useRewardedAd = (
	rewarded: RewardedAd,
	onReward: Action1<RewardedAdReward>
) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const unsubscribeLoaded = rewarded.addAdEventListener(
			RewardedAdEventType.LOADED,
			() => {
				setLoaded(true);
			}
		);
		const unsubscribeEarned = rewarded.addAdEventListener(
			RewardedAdEventType.EARNED_REWARD,
			(reward) => {
				onReward(reward);
				setLoaded(false);
				rewarded.load();
			}
		);

		// Start loading the rewarded ad straight away
		rewarded.load();

		// Unsubscribe from events on unmount
		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, [rewarded, onReward]);

	const showAdIfLoaded = useCallback(() => {
		if (loaded) {
			rewarded.show();
		}
	}, [loaded, rewarded]);

	return { showAdIfLoaded, loaded };
};
