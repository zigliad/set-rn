import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Palette } from "@/hooks/useInitColors";
import React from "react";

export const PaletteDisplay = ({ palette }: { palette: Palette }) => {
	const colors = palette.colors;
	return (
		<HStack>
			{colors.map((color, i) => (
				<Box
					key={color}
					className={
						"w-1/3 h-12 " +
						(i === 0
							? "rounded-l-xl"
							: i === colors.length - 1
								? "rounded-r-xl"
								: "")
					}
					style={{
						backgroundColor: color,
					}}
				/>
			))}
		</HStack>
	);
};
