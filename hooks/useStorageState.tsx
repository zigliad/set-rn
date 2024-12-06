import {
	getData,
	getObjectData,
	StorageKey,
	storeData,
	storeObjectData,
} from "@/utils/storage";
import React, {
	DispatchWithoutAction,
	useCallback,
	useEffect,
	useState,
} from "react";

export const useStorageState = (
	storageKey: StorageKey,
	defaultValue: string,
	onLoad?: (value: string) => void
) => {
	const [value, _setValue] = useState<string | undefined | null>();

	useEffect(() => {
		(async () => {
			let loadedValue = await getData(storageKey, defaultValue);
			if (loadedValue === null) {
				storeData(storageKey, defaultValue);
				_setValue(defaultValue);
				loadedValue = defaultValue;
			} else {
				_setValue(loadedValue);
			}
			onLoad?.(loadedValue);
		})();
	}, [storageKey, defaultValue, onLoad]);

	const setValue = useCallback(
		async (newValue: string) => {
			_setValue(newValue);
			storeData(storageKey, newValue);
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
			storeObjectData(storageKey, newValue);
			_setValue(newValue);
		},
		[storageKey]
	);

	useEffect(() => {
		(async () => {
			const loadedValue = await getObjectData(storageKey);
			if (loadedValue === null) {
				storeObjectData(storageKey, defaultValue);
				_setValue(defaultValue);
			} else {
				_setValue(loadedValue);
			}
		})();
	}, [storageKey, defaultValue]);

	return [value, setValue] as [T, (newValue: T) => Promise<void>];
};
