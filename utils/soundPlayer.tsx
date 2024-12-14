import { Sound, sounds } from "@/constants/sounds";
import { getData, StorageKey } from "@/utils/storage";
import { Audio } from "expo-av";

export const preloadedSounds: Partial<Record<Sound, Audio.Sound>> = {};

export const preloadAllSounds = async () => {
	try {
		for (const [key, value] of Object.entries(sounds)) {
			const { sound } = await Audio.Sound.createAsync(value);
			preloadedSounds[key as Sound] = sound;
		}
	} catch (error) {}
};

export const unloadAllSounds = async () => {
	try {
		for (const [key, value] of Object.entries(preloadedSounds)) {
			await value.unloadAsync();
			delete preloadedSounds[key as Sound];
		}
	} catch (error) {}
};

export const playSound = async (key: Sound) => {
	try {
		const muteSounds = +(await getData(StorageKey.muteSounds, String(0)));
		if (muteSounds || !preloadedSounds[key]) return;

		const sound = preloadedSounds[key];
		await sound.replayAsync(); // `replayAsync` plays the sound from the beginning
	} catch (error) {}
};
