import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKey {
	oneMinute = "oneMinute",
	sixPack = "sixPack",
	eightPack = "eightPack",
	highFive = "highFive",
	drain = "drain",
	survival = "survival",
	disco = "disco",
	speed = "speed",
	levels = "levels",
	mania = "mania",
	expert = "expert",

	totalSetsFound = "totalSetsFound",
	setsFound = "setsFound", // concrete sets values

	seenOnboarding = "seenOnboarding",
	muteSounds = "muteSounds",
	gamesPlayedWithoutAds = "gamesPlayedWithoutAds",

	currentPaletteId = "currentPaletteId",
	myPalettes = "myPalettes",

	myModes = "myModes",

	coins = "coins",
	gems = "gems",
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
