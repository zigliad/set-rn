import { getData, StorageKey } from "@/utils/storage";
import { Audio, AVPlaybackSource } from "expo-av";

export const playSound = async (file: AVPlaybackSource) => {
	const { sound } = await Audio.Sound.createAsync(file);
	const muteSounds = +(await getData(StorageKey.muteSounds, "0"));
	if (!muteSounds) await sound.playAsync();
};
