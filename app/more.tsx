import { titleStyles } from "@/app";
import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { GridAction, GridActions } from "@/components/GridActions";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { BackButton } from "@/components/utils/BackButton";
import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { router } from "expo-router";
import { Candy } from "lucide-react-native";
import { useState } from "react";
import { Linking, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const creditsText = `
App developed and designed by Liad Zigdon, all rights reserved.\n
The game 'SET' was invented by Marsha Falco in 1974.\n
Icons are from www.flaticon.com and were made by Freepik, Good Ware, Those Icons, mynamepong, Google, Pixel Perfect and Roundicons.
`;

const androidPackageName = "host.exp.exponent";
const itunesItemId = 1506464825;

export default function MoreOptions() {
	const [visibleModal, setVisibleModal] = useState(false);
	const [muteSounds, setMuteSounds] = useStorageState(
		StorageKey.muteSounds,
		"0"
	);

	const moreOptionsConfig: GridAction[] = [
		{
			title: "Dummy",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {},
		},
		{
			title: "Colors",
			Icon: require("@/assets/images/grid-action-icons/colors.png"),
			onClick: () => {
				router.push({ pathname: "/colors" });
			},
		},
		{
			title: "Your Sets",
			Icon: require("@/assets/images/grid-action-icons/deck.png"),
			onClick: () => {
				router.push({ pathname: "/setsFound" });
			},
		},
		{
			title: "Shop",
			Icon: require("@/assets/images/grid-action-icons/shop.png"),
			onClick: () => router.push("/shop"),
		},
		{
			title: "Rules",
			Icon: require("@/assets/images/grid-action-icons/rules.png"),
			onClick: () => {
				router.push({ pathname: "/rules" });
			},
		},
		{
			title: +muteSounds ? "Unmute" : "Mute",
			Icon: +muteSounds
				? require("@/assets/images/grid-action-icons/sound-off.png")
				: require("@/assets/images/grid-action-icons/sound-on.png"),
			onClick: () => {
				setMuteSounds(String(1 - +muteSounds));
			},
		},
		{
			title: "Suggest",
			Icon: require("@/assets/images/grid-action-icons/mailbox.png"),
			onClick: () => {
				Linking.openURL(
					"mailto:lilizigi@gmail.com?subject=SET a suggestion&body=I want to suggest..."
				);
			},
		},
		{
			title: "Rate",
			Icon: require("@/assets/images/grid-action-icons/heart.png"),
			onClick: () => {
				if (Platform.OS === "ios")
					Linking.openURL(
						`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
					);
				else if (Platform.OS === "android")
					Linking.openURL(
						`market://details?id=${androidPackageName}&showAllReviews=true`
					);
			},
		},
		{
			title: "Credits",
			Icon: require("@/assets/images/grid-action-icons/credits.png"),
			onClick: () => {
				setVisibleModal(true);
			},
		},
	];

	return (
		<SafeAreaView className="bg-background-base">
			<View className="relative">
				<Text
					className="absolute top-8 left-8"
					size="5xl"
					style={titleStyles.pageTitle}
				>
					More
				</Text>
				<HStack className="w-5/6 self-end">
					<GridActions actions={moreOptionsConfig} />
				</HStack>
				<AwesomeModal
					visible={visibleModal}
					onResolve={() => setVisibleModal(false)}
					type="info"
					header="Credits"
					content={creditsText}
					icon={Candy}
					backdropOnResolve
				/>
				<BackButton />
			</View>
		</SafeAreaView>
	);
}
