import {
	getData,
	getObjectData,
	StorageKey,
	storeData,
	storeObjectData,
} from "@/utils/storage";
import React, { useCallback, useEffect, useState } from "react";

export const useStorageState = (storageKey: StorageKey) => {
	const [value, _setValue] = useState<string | undefined | null>("");

	const setValue = useCallback(
		async (newValue: string) => {
			await storeData(storageKey, newValue);
			_setValue(newValue);
		},
		[storageKey]
	);

	useEffect(() => {
		(async () => {
			const loadedValue = await getData(storageKey);
			_setValue(loadedValue);
		})();
	}, [storageKey]);

	return [value, setValue] as [string, (newValue: string) => Promise<void>];
};

export const useStorageObjectState = <T extends {} | []>(
	storageKey: StorageKey
) => {
	const [value, _setValue] = useState<T>();

	const setValue = useCallback(
		async (newValue: T) => {
			await storeObjectData(storageKey, newValue);
			_setValue(newValue);
		},
		[storageKey]
	);

	useEffect(() => {
		(async () => {
			const loadedValue = await getObjectData(storageKey);
			_setValue(loadedValue);
		})();
	}, [storageKey]);

	return [value, setValue] as [T, (newValue: T) => Promise<void>];
};
