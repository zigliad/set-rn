import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { CurrenciesContext, useInitCurrencies } from "@/hooks/useCurrencies";
import { ColorsContext, useInitColors } from "@/hooks/useInitColors";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import mobileAds from "react-native-google-mobile-ads";

import "@/global.css";
import { MyModesContext, useInitMyModes } from "@/hooks/ads/useMyModes";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import * as Font from "expo-font";
import { useEffect } from "react";

mobileAds().initialize();

export default function RootLayout() {
	const colors = useInitColors();
	const currencies = useInitCurrencies();
	const myModes = useInitMyModes();

	useEffect(() => {
		const checkFonts = async () => {
			const loadedFonts = await Font.getLoadedFonts();
			console.log("Loaded Fonts:", loadedFonts);
		};
		checkFonts();
	}, []);

	return (
		<GluestackUIProvider mode="system">
			<GestureHandlerRootView>
				<MyModesContext.Provider value={myModes}>
					<ColorsContext.Provider value={colors}>
						<CurrenciesContext.Provider value={currencies}>
							<StatusBar hidden />
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen name="index" />
								<Stack.Screen name="game" />
								<Stack.Screen name="more" />
								<Stack.Screen name="shop" />
								<Stack.Screen name="setsFound" />
								<Stack.Screen name="rules" />
								<Stack.Screen name="colors" />
							</Stack>
						</CurrenciesContext.Provider>
					</ColorsContext.Provider>
				</MyModesContext.Provider>
			</GestureHandlerRootView>
		</GluestackUIProvider>
	);
}
