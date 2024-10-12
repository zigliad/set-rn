// Defines how to replace some cards

import Deck from "@/bl/deck/Deck";

// when the user finds a set.
export default abstract class Replacer {
	abstract replace(indexes: number[], deck: Deck): void;
}
