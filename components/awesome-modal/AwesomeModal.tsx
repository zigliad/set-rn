import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Check, Info, LucideIcon, TriangleAlert, X } from "lucide-react-native";
import React, { DispatchWithoutAction } from "react";
import { ScrollView } from "react-native";

export type ModalType = "info" | "success" | "error" | "warning";

const modalTypeConfig: Record<
	ModalType,
	{ color?: string; tailwindColor?: string; icon: LucideIcon }
> = {
	info: {
		tailwindColor: "bg-info-500",
		icon: Info,
	},
	success: {
		tailwindColor: "bg-success-400",
		icon: Check,
	},
	error: {
		tailwindColor: "bg-error-500",
		icon: X,
	},
	warning: {
		tailwindColor: "bg-warning-500",
		icon: TriangleAlert,
	},
};

export const AwesomeModal = ({
	visible = false,
	onResolve,
	header,
	content,
	type = "info",
	buttonText = "Ok",
	color,
	tailwindColor,
	icon,
	backdropOnResolve = false,
}: {
	visible?: boolean;
	onResolve?: DispatchWithoutAction;
	header: string;
	content: string;
	type?: ModalType;
	buttonText?: string;
	color?: string;
	tailwindColor?: string;
	icon?: LucideIcon;
	backdropOnResolve?: boolean;
}) => {
	const computedColor = modalTypeConfig[type]?.color ?? color;
	const computedTailwindColor =
		modalTypeConfig[type]?.tailwindColor ?? tailwindColor;
	const ComputedIcon = modalTypeConfig[type]?.icon ?? icon;

	return (
		<Modal isOpen={visible}>
			<ModalBackdrop
				onPress={backdropOnResolve ? onResolve : undefined}
			/>
			<ModalContent
				className="relative overflow-visible bg-background-card p-2 rounded-xl"
				style={{ borderWidth: 0, maxWidth: 280 }}
			>
				<Center>
					<Box
						className="absolute rounded-full w-22 h-22 -top-14 p-1 bg-background-card"
						style={{ backgroundColor: "#0f0" }}
					>
						<Center
							className={
								"w-20 h-20 rounded-full " +
								(computedTailwindColor ?? "")
							}
							style={{
								...(computedColor && {
									backgroundColor: computedColor,
								}),
							}}
						>
							<Icon
								as={ComputedIcon}
								className={"w-8 h-8 text-white"}
							/>
						</Center>
					</Box>
					<Center className="mt-12 w-full">
						<Heading
							size="2xl"
							style={{
								fontFamily: "PlayfairDisplay_Black",
							}}
						>
							{header}
						</Heading>
						<ScrollView style={{ maxHeight: 120 }} className="px-4">
							<Text
								className="text-center mt-2"
								style={{
									fontFamily: "PlayfairDisplay_Medium",
								}}
							>
								{content}
							</Text>
						</ScrollView>
						<Button
							size="md"
							variant="solid"
							className={
								"mt-6 bg-success-400 w-full rounded-lg " +
								(computedTailwindColor ?? "")
							}
							onPress={onResolve}
							style={{
								...(computedColor && {
									backgroundColor: computedColor,
								}),
							}}
						>
							<ButtonText
								className="text-white"
								style={{
									fontFamily: "PlayfairDisplay_Black",
								}}
							>
								{buttonText}
							</ButtonText>
						</Button>
					</Center>
				</Center>
			</ModalContent>
		</Modal>
	);
};
