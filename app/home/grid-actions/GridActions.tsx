// import { Grid, GridItem } from "@/components/ui/grid";
import { gameColors } from "@/app/index.tsx";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { FlatGrid } from "react-native-super-grid";

export const GridActions = () => {
	return (
		<FlatGrid
			style={{ zIndex: 1000 }}
			itemDimension={100}
			data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
			maxItemsPerRow={3}
			spacing={20}
			renderItem={({ item, index }) =>
				index > 0 ? (
					<Box
						className="bg-background-card rounded-2xl h-48 border-2  border-background-card-shadow opacity-95"
						style={{ borderLeftWidth: 6, borderBottomWidth: 6 }}
						key={item}
					>
						<Center className="h-full">
							<VStack className="justify-center" space="md">
								<Avatar
									className="bg-background-icon border-4"
									size="xl"
									style={{
										borderColor:
											gameColors[
												index % gameColors.length
											],
									}}
								>
									<AvatarFallbackText>
										Ronald Richards
									</AvatarFallbackText>
								</Avatar>
								<Heading
									size="xl"
									style={{
										fontFamily: "PlayfairDisplay_Bold",
									}}
								>
									1 Minute
								</Heading>
							</VStack>
						</Center>
					</Box>
				) : (
					<Box />
				)
			}
		/>
	);
};
