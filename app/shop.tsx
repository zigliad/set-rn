import { OffersGrid } from "@/components/pages/shop/OffersGrid";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { BackButton } from "@/components/utils/BackButton";
import { PriceTag } from "@/components/utils/PriceTag";
import { useCurrencies } from "@/hooks/useCurrencies";
import { SafeAreaView } from "react-native";

export default function Shop() {
	const { coins, gems } = useCurrencies();

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full flex flex-row">
				<VStack className="w-1/3 px-2 py-4" space="lg">
					<PriceTag
						currency="coin"
						price={coins}
						fontSize={52}
						currencySize={52}
					/>
					<PriceTag
						currency="gem"
						price={gems}
						fontSize={52}
						currencySize={52}
					/>
				</VStack>
				<OffersGrid />
				<BackButton />
			</Box>
		</SafeAreaView>
	);
}
