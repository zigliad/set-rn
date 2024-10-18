import { Audio, AVPlaybackSource } from "expo-av";

export const playSound = async (file: AVPlaybackSource) => {
	const { sound } = await Audio.Sound.createAsync(file);
	await sound.playAsync();
};
