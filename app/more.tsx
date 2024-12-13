import { titleStyles } from "@/app";
import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { GridAction, GridActions } from "@/components/GridActions";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { BackButton } from "@/components/utils/BackButton";
import { useStorageState } from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import Constants from "expo-constants";
import { router } from "expo-router";
import { Candy, Heart } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Linking, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CREDITS_TEXT = `
App developed and designed by Liad Zigdon, all rights reserved.\n
The game 'SET' was invented by Marsha Falco in 1974.\n
Icons are from www.flaticon.com and were made by Freepik, Good Ware, Those Icons, mynamepong, Google, Pixel Perfect and Roundicons.\n
App version: ${Constants.expoConfig?.version}`;

const ANDROID_PACKAGE_NAME = "com.zigdonliad.Sets";
const ITUNES_ITEM_ID = 1506464825;

const goToRate = () => {
	if (Platform.OS === "ios")
		Linking.openURL(
			`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${ITUNES_ITEM_ID}?action=write-review`
		);
	else if (Platform.OS === "android")
		Linking.openURL(
			`market://details?id=${ANDROID_PACKAGE_NAME}&showAllReviews=true`
		);
};

export default function MoreOptions() {
	const [visibleCreditsModal, setVisibleCreditsModal] = useState(false);
	const [visibleRateModal, setVisibleRateModal] = useState(false);
	const [muteSounds, setMuteSounds] = useStorageState(
		StorageKey.muteSounds,
		String(0)
	);

	const moreOptionsConfig: GridAction[] = useMemo(
		() => [
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
				onClick: () => setVisibleRateModal(true),
			},
			{
				title: "Credits",
				Icon: require("@/assets/images/grid-action-icons/credits.png"),
				onClick: () => {
					setVisibleCreditsModal(true);
				},
			},
		],
		[muteSounds]
	);

	return (
		<SafeAreaView>
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
					visible={visibleCreditsModal}
					onResolve={() => setVisibleCreditsModal(false)}
					type="info"
					header="Credits"
					content={CREDITS_TEXT}
					icon={Candy}
					backdropOnResolve
				/>
				<AwesomeModal
					visible={visibleRateModal}
					onResolve={goToRate}
					color="#FF0188"
					header="Rate & Love"
					content="Enjoying my little game? 🥹 Would you mind giving it a quick rating?"
					buttonText="Gladly!"
					icon={Heart}
					secondaryButtonText="Not Now"
					secondaryOnResolve={() => setVisibleRateModal(false)}
					backdropSecondaryOnResolve
				/>
				<BackButton />
			</View>
		</SafeAreaView>
	);
}
