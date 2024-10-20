import { Avatar } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { sounds } from "@/constants/sounds";
import { useColors } from "@/hooks/useInitColors";
import { playSound } from "@/utils/soundPlayer";
import React, { DispatchWithoutAction } from "react";
import { ImageURISource, Pressable } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export type GridAction = {
	title: string;
	Icon: ImageURISource;
	onClick: DispatchWithoutAction;
	key?: string;
};

export const GridActions = ({ actions }: { actions: GridAction[] }) => {
	const { colors } = useColors();

	return (
		<FlatGrid
			style={{ zIndex: 10 }}
			itemDimension={100}
			maxItemsPerRow={3}
			spacing={20}
			data={actions}
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
						key={item.key ?? item.title}
					>
						<Center className="h-full">
							<Pressable
								onPress={async () => {
									item.onClick();
									await playSound(sounds.click);
								}}
							>
								<VStack className="justify-center" space="md">
									<Avatar
										className="bg-background-icon border-4 overflow-hidden rounded-full w-28 h-28"
										style={{
											overflow: "hidden",
											borderColor:
												colors[index % colors.length],
										}}
									>
										<Image
											source={item.Icon}
											alt={item.title}
											className="w-full h-full"
										/>
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
							</Pressable>
						</Center>
					</Box>
				);
			}}
		/>
	);
};
