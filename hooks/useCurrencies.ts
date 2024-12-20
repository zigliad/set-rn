import { Action1 } from "@/extra-types/utils/functions";
import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { createContext, useCallback, useContext } from "react";

export type CurrenciesContextType = {
	coins: number;
	gems: number;
	incCoins: Action1<number>;
	incGems: Action1<number>;
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
	{} as CurrenciesContextType
);

export const useInitCurrencies = () => {
	const [coins, setCoins] = useStorageState(StorageKey.coins, String(0));
	const [gems, setGems] = useStorageState(StorageKey.gems, String(0));

	const incCoins = useCallback(
		(amount: number) => {
			if (+coins + amount >= 0) setCoins(String(+coins + amount));
		},
		[coins, setCoins]
	);

	const incGems = useCallback(
		(amount: number) => {
			if (+gems + amount >= 0) setGems(String(+gems + amount));
		},
		[gems, setGems]
	);

	return { coins: +coins, gems: +gems, incCoins, incGems };
};

export const useCurrencies = () => useContext(CurrenciesContext);
