import {
	getData,
	getObjectData,
	StorageKey,
	storeData,
	storeObjectData,
} from "@/utils/storage";
import React, { useCallback, useEffect, useState } from "react";

export const useStorageState = (
	storageKey: StorageKey,
	defaultValue: string = ""
) => {
	const [value, _setValue] = useState<string | undefined | null>("");

	useEffect(() => {
		(async () => {
			const loadedValue = await getData(storageKey);
			if (loadedValue === null) {
				await storeData(storageKey, defaultValue);
				_setValue(defaultValue);
			} else {
				_setValue(loadedValue);
			}
		})();
	}, [storageKey, defaultValue]);

	const setValue = useCallback(
		async (newValue: string) => {
			await storeData(storageKey, newValue);
			_setValue(newValue);
		},
		[storageKey]
	);

	return [value, setValue] as [string, (newValue: string) => Promise<void>];
};

export const useStorageObjectState = <T extends {} | []>(
	storageKey: StorageKey,
	defaultValue: T
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
			if (loadedValue === null) {
				await storeObjectData(storageKey, defaultValue);
				_setValue(defaultValue);
			} else {
				_setValue(loadedValue);
			}
		})();
	}, [storageKey, defaultValue]);

	return [value, setValue] as [T, (newValue: T) => Promise<void>];
};
