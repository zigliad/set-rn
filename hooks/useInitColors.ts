import { Action1 } from "@/extra-types/utils/functions";
import {
	useStorageObjectState,
	useStorageState,
} from "@/hooks/useStorageState";
import { Price } from "@/types/price";
import { StorageKey } from "@/utils/storage";
import { toHumanCase } from "@/utils/stringUtils";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

export type Palette = {
	id: string;
	nickname?: string;
	colors: string[];
	price?: Price;
};

export type ColorContextType = {
	currentPalette: Palette;
	setCurrentPaletteId: Action1<string>;
	allPalettes: Record<string, Palette & { unavailable?: boolean }>;
	myPalettes: string[];
	addPalette: Action1<Palette>;
};

export const ColorsContext = createContext<ColorContextType>(
	{} as ColorContextType
);

export const CLASSIC_PALETTE_ID = "classic";
export const DEFAULT_PALETTE_PRICE: Price = { coins: 100 };
export const DEFAULT_MY_PALETTES = [CLASSIC_PALETTE_ID];
export const CLASSIC_PALETTE = {
	nickname: toHumanCase(CLASSIC_PALETTE_ID),
	colors: ["#52D95D", "#FF0188", "#A2A0DF"],
};

export const useInitColors = () => {
	const theme = useColorScheme();
	const [currentPaletteId, setCurrentPaletteId] = useStorageState(
		StorageKey.currentPaletteId,
		CLASSIC_PALETTE_ID
	);

	const [myPalettes, setMyPalettes] = useStorageObjectState<string[]>(
		StorageKey.myPalettes,
		DEFAULT_MY_PALETTES
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
							theme === "dark" ? "#F3F8FF" : "#dfcdb1",
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
							theme === "dark" ? "#000000" : "#141414",
							theme === "dark" ? "#fff400" : "#eae100",
							theme === "dark" ? "#a0a0a0" : "#bcbcbc",
						],
					},
					superman: {
						colors: [
							"#f11712",
							theme === "dark" ? "#ffe539" : "#f7db1f",
							"#0098f7",
						],
					},
					autumn: {
						colors: [
							"#CD5C08",
							theme === "dark" ? "#FFE8C5" : "#d2bfa3",
							"#78B3CE",
						],
					},
					nature: {
						colors: ["#3B82F6", "#F97316", "#10B981"],
					},
					unicorn: {
						colors: ["#FF99CC", "#a2edfe", "#B399FF"],
					},
					beach: {
						price: { coins: 2000 },
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

	const addPalette = useCallback(
		(palette: Palette) => {
			setMyPalettes([...myPalettes, palette.id]);
		},
		[myPalettes]
	);

	return {
		currentPalette:
			allPalettes[currentPaletteId] ?? allPalettes[CLASSIC_PALETTE_ID],
		setCurrentPaletteId,
		allPalettes,
		myPalettes,
		addPalette,
	};
};

export const useColors = () => useContext(ColorsContext);
