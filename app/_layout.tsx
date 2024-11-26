import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { CurrenciesContext, useInitCurrencies } from "@/hooks/useCurrencies";
import { ColorsContext, useInitColors } from "@/hooks/useInitColors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import mobileAds from "react-native-google-mobile-ads";

import "@/global.css";
import "react-native-reanimated";
import { MyModesContext, useInitMyModes } from "@/hooks/ads/useMyModes";

mobileAds().initialize();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		PlayfairDisplay_Regular: require("../assets/fonts/PlayfairDisplay_400.ttf"),
		PlayfairDisplay_Medium: require("../assets/fonts/PlayfairDisplay_500.ttf"),
		PlayfairDisplay_Bold: require("../assets/fonts/PlayfairDisplay_700.ttf"),
		PlayfairDisplay_Black: require("../assets/fonts/PlayfairDisplay_900.ttf"),
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	const colors = useInitColors();
	const currencies = useInitCurrencies();
	const myModes = useInitMyModes();

	if (!loaded) return null;

	return (
		<GluestackUIProvider mode="system">
			<GestureHandlerRootView>
				<MyModesContext.Provider value={myModes}>
					<ColorsContext.Provider value={colors}>
						<CurrenciesContext.Provider value={currencies}>
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
