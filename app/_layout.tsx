import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

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

	if (!loaded) return null;

	return (
		<GluestackUIProvider mode="system">
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="game" />
			</Stack>
		</GluestackUIProvider>
	);
}
