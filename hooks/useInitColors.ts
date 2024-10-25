import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import {
	createContext,
	DispatchWithoutAction,
	useCallback,
	useContext,
} from "react";

export const colors = [
	["#52D95D", "#FF0188", "#A2A0DF"],
	["#EF476F", "#FFD166", "#06D6A0"],
	["#FF9300", "#3DACF7", "#77C344"],
	["#FF006E", "#8338EC", "#FFBE0B"],
];

export type ColorContextType = {
	colors: string[];
	next: DispatchWithoutAction;
};

export const ColorsContext = createContext<ColorContextType>(
	{} as ColorContextType
);

export const useInitColors = () => {
	const [colorIndex, setColorsIndex] = useStorageState(
		StorageKey.colorIndex,
		"0"
	);

	const next = useCallback(
		async () =>
			await setColorsIndex(String((+colorIndex + 1) % colors.length)),
		[colorIndex]
	);

	return { colors: colors[+colorIndex], next };
};

export const useColors = () => useContext(ColorsContext);
