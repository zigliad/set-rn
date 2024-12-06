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

export type GridItemIcon = { icon: LucideIcon; color: string };

export type GridAction = {
	title: string;
	Icon: ImageURISource;
	onClick: DispatchWithoutAction;
	key?: string;
	leftIcon?: GridItemIcon;
	rightIcon?: GridItemIcon;
	disabled?: boolean;
	onDisabledClick?: DispatchWithoutAction;
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
	const { currentPalette: palette } = useColors();
	const currentScheme = useColorScheme();
	console.log(currentScheme);
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
						className={
							"bg-background-card rounded-2xl h-48 border-2 border-background-card-shadow " +
							(item.disabled ? "opacity-25" : "opacity-95")
						}
						style={styles.box}
						key={item.key ?? item.title}
					>
						<Box className="w-full h-full relative">
							{item.leftIcon && (
								<Icon
									as={item.leftIcon.icon}
									size={24}
									className={"absolute left-2 top-2"}
									style={{ color: item.leftIcon.color }}
								/>
							)}
							{item.rightIcon && (
								<Icon
									as={item.rightIcon.icon}
									size={24}
									className={"absolute right-2 top-2"}
									style={{
										color: item.rightIcon.color,
									}}
								/>
							)}
							<Center className="h-full w-full absolute">
								<Pressable
									onPress={async () => {
										if (!item.disabled) {
											item.onClick();
											playSound(sounds.click);
										} else {
											item.onDisabledClick?.();
										}
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
													palette.colors[
														index %
															palette.colors
																.length
													],
											}}
										>
											<Image
												source={item.Icon}
												alt={item.title}
												className="w-full h-full"
												tintColor={
													currentScheme === "dark"
														? "#fff"
														: "#181718"
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
