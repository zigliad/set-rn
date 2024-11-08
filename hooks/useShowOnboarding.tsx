import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import React, { useCallback, useEffect, useState } from "react";

export const useShowOnboarding = () => {
	const [visibleModal, setVisibleModal] = useState(false);
	const [seenOnboarding, setSeenOnboarding] = useStorageState(
		StorageKey.seenOnboarding,
		String(0)
	);

	useEffect(() => {
		if (+seenOnboarding === 0) {
			setVisibleModal(true);
		}
	}, [seenOnboarding]);

	const finishOnboarding = useCallback(() => {
		setSeenOnboarding(String(1));
		setVisibleModal(false);
	}, []);

	return { visibleModal, finishOnboarding };
};
