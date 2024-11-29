import Brain from "@/bl/brain/Brain";
import OddSizeSetValidator from "@/bl/brain/parts/set-validator/OddSizeSetValidator";
import BasicSetsComparator from "@/bl/brain/parts/sets-comparators/BasicSetsComparator";
import ExcludeCardsGenerator from "@/bl/generators/card/ExcludeCardsGenerator";
import BasicRandomCardExcludeGenerator from "@/bl/generators/card/random-exclude/BasicRandomCardExcludeGenerator";
import BasicRandomCardGenerator from "@/bl/generators/card/random/BasicRandomCardGenerator";
import DisjointSetsDeckGenerator from "@/bl/generators/deck/DisjointSetsDeckGenerator";
import { useDrainMode } from "@/bl/modes/single/useDrainMode";
import NullReplacer from "@/bl/replacer/NullReplacer";
import { onGameEndCallback } from "@/modes/modes";
import { useMemo } from "react";

export const createDrainMode = (
	minDisjointSets: number = 4,
	minSets: number = 6,
	attributesCount: number = 4,
	optionsCount: number = 3,
	seconds: number = 5,
	storageKey?: string
) => {
	const useDrainModeX = (onGameEnd: onGameEndCallback) => {
		const { deckGenerator, replacer } = useMemo(() => {
			const validator = new OddSizeSetValidator(
				attributesCount,
				optionsCount
			);
			const comparator = new BasicSetsComparator();
			const brain = new Brain(
				attributesCount,
				optionsCount,
				validator,
				comparator
			);
			const randomCardGenerator = new BasicRandomCardGenerator();
			const randomCardExcludeGenerator =
				new BasicRandomCardExcludeGenerator(randomCardGenerator);
			const cardsGenerator = new ExcludeCardsGenerator(
				attributesCount,
				optionsCount,
				randomCardGenerator,
				randomCardExcludeGenerator
			);
			const deckGenerator = new DisjointSetsDeckGenerator(
				12,
				minDisjointSets,
				brain,
				cardsGenerator,
				minSets
			);

			const replacer = new NullReplacer();

			return {
				replacer,
				deckGenerator,
			};
		}, []);

		return useDrainMode(
			onGameEnd,
			deckGenerator,
			replacer,
			seconds,
			storageKey
		);
	};

	return useDrainModeX;
};
