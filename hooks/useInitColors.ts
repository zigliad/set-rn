import { Action1 } from "@/extra-types/utils/functions";
import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

export type ColorContextType = {
	currentColors: string[];
	setCurrentColors: Action1<string[]>;
	allColors: { name: string; colors: string[] };
};

export const ColorsContext = createContext<ColorContextType>(
	{} as ColorContextType
);

const COLORS_DELIMITER = ";";

export const useInitColors = () => {
	const [currentColors, _setCurrentColors] = useStorageState(
		StorageKey.currentColors,
		["#52D95D", "#FF0188", "#A2A0DF"].join(COLORS_DELIMITER)
	);

	const theme = useColorScheme();
	const allColors = useMemo(
		() => [
			{ name: "Classic", colors: ["#52D95D", "#FF0188", "#A2A0DF"] },
			{ name: "Summer", colors: ["#06D6A0", "#EF476F", "#FFD166"] },
			{ name: "Halloween", colors: ["#8FD14F", "#FF6600", "#604CC3"] },
			{ name: "Christmas", colors: ["#97BE5A", "#FF0000", "#FFE8C5"] },
			{
				name: "Ladies",
				colors: [
					theme === "dark" ? "#F3F8FF" : "#3f3f3f",
					"#E26EE5",
					"#7E30E1",
				],
			},
		],
		[theme]
	);

	// const next = useCallback(
	// 	async () =>
	// 		await setColorsIndex(String((+colorIndex + 1) % allColors.length)),
	// 	[colorIndex]
	// );

	const setCurrentColors = useCallback(
		async (colors: string[]) =>
			await _setCurrentColors(colors.join(COLORS_DELIMITER)),
		[_setCurrentColors]
	);

	return {
		currentColors: (currentColors ?? "").split(COLORS_DELIMITER), // allColors[+colorIndex % allColors.length].colors,
		setCurrentColors,
		allColors,
	};
};

export const useColors = () => useContext(ColorsContext);
