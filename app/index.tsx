import { GridActions } from "@/app/home/grid-actions/GridActions";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView, View } from "react-native";

export default function Index() {
	return (
		<SafeAreaView className="bg-background-base">
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<HStack className="w-full justify-between">
					<Heading
						className="mt-8 ml-8"
						size="5xl"
						style={{
							fontFamily: "PlayfairDisplay_Black",
							fontSize: 100,
						}}
					>
						SET
					</Heading>
					<GridActions />
				</HStack>
			</View>
		</SafeAreaView>
	);
}
