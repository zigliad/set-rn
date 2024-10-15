import { Box } from "@/components/ui/box";
import React, { PropsWithChildren } from "react";

export const ElevatedCard = ({
	children,
	className = "",
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<Box
			className={
				"bg-background-card rounded-2xl border-2 border-background-card-shadow " +
				className
			}
			style={{
				borderLeftWidth: 6,
				borderBottomWidth: 6,
				zIndex: 10,
			}}
		>
			{children}
		</Box>
	);
};
