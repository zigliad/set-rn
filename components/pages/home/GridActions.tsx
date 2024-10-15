import { gameColors } from "@/assets/game-colors/gameColors";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { modesConfig } from "@/modes/config";
import { Link } from "expo-router";
import React from "react";
import { FlatGrid } from "react-native-super-grid";

export const GridActions = () => {
	return (
		<FlatGrid
			style={{ zIndex: 10 }}
			itemDimension={100}
			maxItemsPerRow={3}
			spacing={20}
			data={modesConfig}
			renderItem={({ item, index }) => {
				if (index === 0) return <Box />;
				return (
					<Box
						className="bg-background-card rounded-2xl h-48 border-2 border-background-card-shadow opacity-95"
						style={{
							borderLeftWidth: 6,
							borderBottomWidth: 6,
							zIndex: 10,
						}}
						key={item.mode}
					>
						<Center className="h-full">
							<Link
								href={{
									pathname: "/game",
									params: { mode: item.mode },
								}}
							>
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
											{item.title}
										</AvatarFallbackText>
									</Avatar>
									<Center>
										<Heading
											size="xl"
											style={{
												fontFamily:
													"PlayfairDisplay_Bold",
											}}
										>
											{item.title}
										</Heading>
									</Center>
								</VStack>
							</Link>
						</Center>
					</Box>
				);
			}}
		/>
	);
};
