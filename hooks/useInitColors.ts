import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import {
	createContext,
	DispatchWithoutAction,
	useCallback,
	useContext,
	useMemo,
} from "react";
import { useColorScheme } from "react-native";

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

	const theme = useColorScheme();
	const colors = useMemo(
		() => [
			["#52D95D", "#FF0188", "#A2A0DF"],
			["#06D6A0", "#EF476F", "#FFD166"],
			["#8FD14F", "#FF6600", "#604CC3"],
			[theme === "dark" ? "#F3F8FF" : "#3f3f3f", "#E26EE5", "#7E30E1"],
		],
		[theme]
	);

	const next = useCallback(
		async () =>
			await setColorsIndex(String((+colorIndex + 1) % colors.length)),
		[colorIndex]
	);

	return { colors: colors[+colorIndex % colors.length], next };
};

export const useColors = () => useContext(ColorsContext);
