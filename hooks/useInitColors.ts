import { Action1 } from "@/extra-types/utils/functions";
import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { toHumanCase } from "@/utils/stringUtils";
import { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

export type Palette = { id: string; nickname?: string; colors: string[] };

export type ColorContextType = {
	currentPalette: Palette;
	setCurrentPaletteId: Action1<string>;
	allPalettes: Record<string, Palette & { unavailable?: boolean }>;
};

export const ColorsContext = createContext<ColorContextType>(
	{} as ColorContextType
);

const CLASSIC_PALETTE_ID = "classic";

export const useInitColors = () => {
	const theme = useColorScheme();
	const [currentPaletteId, setCurrentPaletteId] = useStorageState(
		StorageKey.currentPaletteId,
		CLASSIC_PALETTE_ID
	);

	const allPalettes: ColorContextType["allPalettes"] = useMemo(
		() =>
			Object.fromEntries(
				Object.entries({
					[CLASSIC_PALETTE_ID]: {
						nickname: toHumanCase(CLASSIC_PALETTE_ID),
						colors: ["#52D95D", "#FF0188", "#A2A0DF"],
					},
					summer: {
						colors: ["#ACD793", "#FF70AB", "#FFDB5C"],
					},
					halloween: {
						colors: ["#8FD14F", "#FF6600", "#604CC3"],
					},
					christmas: {
						colors: [
							"#97BE5A",
							"#FF0000",
							theme === "dark" ? "#FFE8C5" : "#d2bfa3",
						],
					},
					ladies: {
						colors: [
							"#7E30E1",
							"#E26EE5",
							theme === "dark" ? "#F3F8FF" : "#3f3f3f",
						],
					},
					irish: {
						colors: [
							"#00712D",
							theme === "dark" ? "#FFFBE6" : "#d2bfa3",
							"#FF9100",
						],
					},
					batman: {
						colors: [
							theme === "dark" ? "#141414" : "#141414",
							"#fff400",
							"#a0a0a0",
						],
					},
					superman: {
						colors: ["#f11712", "#ffe539", "#0098f7"],
					},
					unicorn: {
						colors: ["#a2edfe", "#c8b1ff", "#ffc9f2"],
						unavailable: true,
					},
					beach: {
						colors: [
							"#92B4EC",
							theme === "dark" ? "#fff2dd" : "#d2bfa3",
							"#FFD24C",
						],
					},
				}).map(([id, p]) => [
					id,
					{ ...p, id, nickname: p.nickname ?? toHumanCase(id) },
				])
			),
		[theme]
	);

	return {
		currentPalette:
			allPalettes[currentPaletteId] ?? allPalettes[CLASSIC_PALETTE_ID],
		setCurrentPaletteId,
		allPalettes,
	};
};

export const useColors = () => useContext(ColorsContext);
