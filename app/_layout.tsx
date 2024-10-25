import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { ColorsContext, useInitColors } from "@/hooks/useInitColors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import mobileAds from "react-native-google-mobile-ads";
import "react-native-reanimated";

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

	if (!loaded) return null;

	return (
		<GluestackUIProvider mode="system">
			<GestureHandlerRootView>
				<ColorsContext.Provider value={colors}>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name="index" />
						<Stack.Screen name="game" />
						<Stack.Screen name="more" />
						<Stack.Screen name="setsFound" />
					</Stack>
				</ColorsContext.Provider>
			</GestureHandlerRootView>
		</GluestackUIProvider>
	);
}
