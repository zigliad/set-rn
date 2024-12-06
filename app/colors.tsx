import { BuyPaletteModal } from "@/components/pages/colors/BuyPaletteModal";
import { PalettesGrid } from "@/components/pages/colors/PalettesGrid";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { BackButton } from "@/components/utils/BackButton";
import { PriceTag } from "@/components/utils/PriceTag";
import { useCurrencies } from "@/hooks/useCurrencies";
import { Palette } from "@/hooks/useInitColors";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Colors() {
	const { coins } = useCurrencies();
	const [paletteClicked, setPaletteClicked] = useState<Palette>();

	return (
		<SafeAreaView className="bg-background-base">
			<Box className="relative w-full h-full flex flex-row">
				<VStack className="w-1/3 px-2 py-4">
					<PriceTag price={coins} fontSize={48} currencySize={48} />
				</VStack>
				<PalettesGrid onPaletteClick={setPaletteClicked} />
				<BackButton />
			</Box>
			<BuyPaletteModal
				palette={paletteClicked}
				onResolve={() => {
					setPaletteClicked(undefined);
				}}
			/>
		</SafeAreaView>
	);
}
