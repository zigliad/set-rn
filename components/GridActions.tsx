import { Avatar } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { sounds } from "@/constants/sounds";
import { useColors } from "@/hooks/useInitColors";
import { fontWeightStyles } from "@/styles/commonStyles";
import { playSound } from "@/utils/soundPlayer";
import { LucideIcon } from "lucide-react-native";
import React, { DispatchWithoutAction } from "react";
import {
	ImageURISource,
	Pressable,
	StyleSheet,
	useColorScheme,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

export type Badge = { icon: LucideIcon; color: string };

export type GridAction = {
	title: string;
	Icon: ImageURISource;
	onClick: DispatchWithoutAction;
	key?: string;
	badge?: Badge;
};

const styles = StyleSheet.create({
	grid: {
		zIndex: 10,
	},
	box: {
		borderLeftWidth: 6,
		borderBottomWidth: 6,
		zIndex: 10,
	},
});

export const GridActions = ({ actions }: { actions: GridAction[] }) => {
	const { currentColors: colors } = useColors();
	const currentScheme = useColorScheme();

	return (
		<FlatGrid
			style={styles.grid}
			itemDimension={100}
			maxItemsPerRow={3}
			spacing={20}
			data={actions}
			renderItem={({ item, index }) => {
				if (index === 0) return <Box />;
				return (
					<Box
						className="bg-background-card rounded-2xl h-48 border-2 border-background-card-shadow opacity-95"
						style={styles.box}
						key={item.key ?? item.title}
					>
						<Box className="w-full h-full absolute">
							{item.badge && (
								<Icon
									as={item.badge.icon}
									size={24}
									className={"relative left-2 top-2"}
									style={{ color: item.badge.color }}
								/>
							)}
							<Center className="h-full w-full absolute">
								<Pressable
									onPress={async () => {
										item.onClick();
										playSound(sounds.click);
									}}
								>
									<VStack
										className="justify-center"
										space="md"
									>
										<Avatar
											className="bg-background-icon border-4 overflow-hidden rounded-full w-28 h-28"
											style={{
												overflow: "hidden",
												borderColor:
													colors[
														index % colors.length
													],
											}}
										>
											<Image
												source={item.Icon}
												alt={item.title}
												className="w-full h-full"
												tintColor={
													currentScheme === "light"
														? "#181718"
														: "#fff"
												}
											/>
										</Avatar>
										<Center>
											<Heading
												size="xl"
												style={fontWeightStyles.bold}
											>
												{item.title}
											</Heading>
										</Center>
									</VStack>
								</Pressable>
							</Center>
						</Box>
					</Box>
				);
			}}
		/>
	);
};
