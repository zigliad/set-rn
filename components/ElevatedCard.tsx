import { Box } from "@/components/ui/box";
import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

export const ElevatedCard = ({
	children,
	className = "",
	style = undefined,
}: PropsWithChildren<{
	className?: string;
	style?: StyleProp<ViewStyle>;
}>) => {
	return (
		<Box
			className={
				"bg-background-card rounded-2xl border-2 border-background-card-shadow " +
				className
			}
			style={[
				{
					borderLeftWidth: 6,
					borderBottomWidth: 6,
					zIndex: 10,
				},
				style,
			]}
		>
			{children}
		</Box>
	);
};
