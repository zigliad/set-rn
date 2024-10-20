import { GridAction, GridActions } from "@/components/GridActions";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { useColors } from "@/hooks/useInitColors";
import { getData, StorageKey, storeData } from "@/utils/storage";
import { router } from "expo-router";
import { Linking, SafeAreaView, View } from "react-native";
import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import { useState } from "react";

const creditsText = `
App developed and designed by Liad Zigdon, all rights reserved.\n
The game 'SET' was invented by Marsha Falco in 1974.\n
Icons are from www.flaticon.com and were made by Freepik, Good Ware, Those Icons, mynamepong, Google, Pixel Perfect and Roundicons.
`;

export default function MoreOptions() {
	const { next: nextColors } = useColors();
	const [visibleModal, setVisibleModal] = useState(false);

	const moreOptionsConfig: GridAction[] = [
		{
			title: "Dummy",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {},
		},
		{
			title: "Back",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: router.back,
		},
		{
			title: "Rules",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {},
		},
		{
			title: "Colors",
			Icon: require("@/assets/images/mode-icons/1-minute.png"),
			onClick: nextColors,
		},
		{
			title: "Your Sets",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {
				router.push({ pathname: "/setsFound" });
			},
		},
		{
			title: "Sounds",
			Icon: require("@/assets/images/mode-icons/1-minute.png"),
			onClick: async () => {
				const muteSounds = +(
					(await getData(StorageKey.muteSounds)) ?? 0
				);
				await storeData(StorageKey.muteSounds, 1 - muteSounds);
			},
		},
		{
			title: "Suggest",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {
				Linking.openURL(
					"mailto:lilizigi@gmail.com?subject=SET a suggestion&body=I want to suggest..."
				);
			},
		},
		{
			title: "Rate",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {},
		},
		{
			title: "Credits",
			Icon: require("@/assets/images/mode-icons/relax.png"),
			onClick: () => {
				setVisibleModal(true);
			},
		},
	];

	return (
		<SafeAreaView className="bg-background-base">
			<View className="relative">
				<Heading
					className="absolute top-8 left-8"
					size="5xl"
					style={{
						zIndex: 0,
						fontFamily: "PlayfairDisplay_Black",
						fontSize: 130,
						textShadowColor: "#aaa",
						textShadowOffset: { width: 5, height: 5 },
						textShadowRadius: 0,
					}}
				>
					More
				</Heading>
				<HStack className="w-5/6 self-end">
					<GridActions actions={moreOptionsConfig} />
				</HStack>
				<AwesomeModal
					visible={visibleModal}
					onResolve={() => setVisibleModal(false)}
					type="info"
					header="Credits"
					content={creditsText}
					backdropOnResolve
				/>
			</View>
		</SafeAreaView>
	);
}
