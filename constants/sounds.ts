import { AVPlaybackSource } from "expo-av";

const clickSound = require("@/assets/sounds/click.wav");
const clickSoftSound = require("@/assets/sounds/click-soft.mp3");
const successSound = require("@/assets/sounds/success.wav");
const whooshSound = require("@/assets/sounds/whoosh.wav");
const magicSound = require("@/assets/sounds/magic.wav");
const failSound = require("@/assets/sounds/fail.mp3");
const errorSound = require("@/assets/sounds/error.mp3");
const buySound = require("@/assets/sounds/buy.mp3");

type Sound =
	| "click"
	| "setFound"
	| "restart"
	| "win"
	| "lose"
	| "error"
	| "buy";

export const sounds: Record<Sound, AVPlaybackSource> = {
	click: clickSoftSound, //clickSound,
	setFound: successSound,
	restart: whooshSound,
	win: magicSound,
	lose: failSound,
	error: errorSound,
	buy: buySound,
};
