// import { Grid, GridItem } from "@/components/ui/grid";
import {
	Avatar,
	AvatarFallbackText,
	AvatarBadge,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { FlatGrid } from "react-native-super-grid";

export const GridActions = () => {
	return (
		<FlatGrid
			itemDimension={100}
			data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
			maxItemsPerRow={3}
			spacing={20}
			// adjustGridToStyles
			// contentContainerStyle={{
			// 	maxWidth: "60%",
			// }}
			renderItem={({ item, index }) =>
				index > 0 ? (
					<Box
						className="bg-background-card shadow-sm rounded-xl h-48"
						key={item}
					>
						<Center className="h-full">
							<VStack className="justify-center" space="md">
								<Avatar
									className="bg-background-icon border-4 border-indigo-500"
									size="xl"
								>
									<AvatarFallbackText className="text-white">
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
	// return (
	// 	<Grid
	// 		className="gap-4"
	// 		_extra={{
	// 			className: "grid-cols-9",
	// 		}}
	// 	>
	// 		<GridItem
	// 			_extra={{
	// 				className: "col-span-3",
	// 			}}
	// 		>
	// 			<Text>A</Text>
	// 		</GridItem>
	// 		<GridItem
	// 			_extra={{
	// 				className: "col-span-3",
	// 			}}
	// 		>
	// 			<Text>A</Text>
	// 		</GridItem>
	// 		<GridItem
	// 			_extra={{
	// 				className: "col-span-3",
	// 			}}
	// 		>
	// 			<Text>A</Text>
	// 		</GridItem>
	// 		<GridItem
	// 			_extra={{
	// 				className: "col-span-3",
	// 			}}
	// 		>
	// 			<Text>A</Text>
	// 		</GridItem>
	// 		<GridItem
	// 			_extra={{
	// 				className: "col-span-3",
	// 			}}
	// 		>
	// 			<Text>A</Text>
	// 		</GridItem>
	// 	</Grid>
	// );
};
