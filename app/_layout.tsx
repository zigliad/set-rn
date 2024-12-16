import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { CurrenciesContext, useInitCurrencies } from "@/hooks/useCurrencies";
import { ColorsContext, useInitColors } from "@/hooks/useInitColors";
import { MyModesContext, useInitMyModes } from "@/hooks/useMyModes";
import { usePreloadSounds } from "@/hooks/usePreloadSounds";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nManager, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import mobileAds from "react-native-google-mobile-ads";

import "@/global.css";
import "react-native-reanimated";

mobileAds().initialize();

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function RootLayout() {
	const colors = useInitColors();
	const currencies = useInitCurrencies();
	const myModes = useInitMyModes();
	const currentScheme = useColorScheme();

	usePreloadSounds();

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
									contentStyle: {
										backgroundColor:
											currentScheme === "dark"
												? "#1c1c1e"
												: "#f2f2f6",
									},
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
