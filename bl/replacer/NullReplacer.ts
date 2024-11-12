// Replace the cards with nulls

import Deck from "@/bl/deck/Deck";
import Replacer from "@/bl/replacer/Replacer";

export default class NullReplacer extends Replacer {
	replace(indexes: number[], deck: Deck) {
		indexes.map((index, i) => deck.cards.splice(index, 1, null));
	}
}
