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
import { useColorScheme } from "react-native";

mobileAds().initialize();

export default function RootLayout() {
	const colors = useInitColors();
	const currencies = useInitCurrencies();
	const myModes = useInitMyModes();
	const currentScheme = useColorScheme();

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
											currentScheme === "light"
												? "#f2f2f6"
												: "#1c1c1e",
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
