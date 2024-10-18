import Brain from "@/bl/brain/Brain";
import Deck from "@/bl/deck/Deck";
import { Function } from "@/extra-types/utils/functions";
import { DispatchWithoutAction } from "react";

export enum GameResult {
	win,
	lose,
}

export type Mode = {
	gameEnded: boolean;
	gameResult?: GameResult;
	deck: Deck;
	brain: Brain;
	newGame: DispatchWithoutAction;
	checkSet: Function<number[], boolean>;
	rules: string;
	name: string;
	title: string;
	endgameTitle: string;
};
