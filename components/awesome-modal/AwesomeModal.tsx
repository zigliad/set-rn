import { Text } from "@/components/ui/text";
import React, { DispatchWithoutAction } from "react";
import { Modal } from "react-native";

export const AwesomeModal = ({
	visible = false,
	onResolve,
}: {
	visible?: boolean;
	onResolve?: DispatchWithoutAction;
}) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={true}
			onRequestClose={() => {
				onResolve?.();
			}}
		>
			<Text>Modallll</Text>
		</Modal>
	);
};
