import { Box } from "@/components/ui/box";
import { BackButton } from "@/components/utils/BackButton";
import { SafeAreaView } from "react-native";

export default function Shop() {
	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full flex flex-row">
				<BackButton />
			</Box>
		</SafeAreaView>
	);
}
