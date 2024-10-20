import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKey {
	time60 = "time60",
	static6 = "static6",
	static8 = "static8",
	race5 = "race5",
	disco60 = "disco60",
	totalSetsFound = "totalSetsFound",
	setsFound = "setsFound", // concrete sets values
	colorIndex = "colorIndex",
	muteSounds = "muteSounds",
}

export const storeData = async (key: string, value: string | number) => {
	try {
		await AsyncStorage.setItem(key, String(value));
	} catch (e) {
		// saving error
	}
};

export const storeObjectData = async (key: string, value: Object) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// saving error
	}
};

export const getData = async (key?: string) => {
	if (key === undefined) return undefined;
	try {
		// returns null if not exists yet
		const value = await AsyncStorage.getItem(key);
		return value;
	} catch (e) {
		// error reading value
	}
};

export const getObjectData = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};
