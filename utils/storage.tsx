import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKey {
	time60 = "time60",
	static6 = "static6",
	static8 = "static8",
	race5 = "race5",
	race3_12 = "race3_12",
	disco60 = "disco60",
	drain = "drain",
	speed10_5 = "speed10_5",
	totalSetsFound = "totalSetsFound",
	setsFound = "setsFound", // concrete sets values
	colorIndex = "colorIndex",
	muteSounds = "muteSounds",
	gamesPlayedWithoutAds = "gamesPlayedWithoutAds",
	seenOnboarding = "seenOnboarding",
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

export const getData = async (key: string, defaultValue: string) => {
	try {
		// returns null if not exists yet
		const value = await AsyncStorage.getItem(key);
		return value ?? defaultValue;
	} catch (e) {
		// error reading value
		return defaultValue;
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
