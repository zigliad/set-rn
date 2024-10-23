import { AwesomeModal } from "@/components/awesome-modal/AwesomeModal";
import {
	useStorageObjectState,
	useStorageState,
} from "@/hooks/useStorageState";
import { StorageKey } from "@/utils/storage";
import { Award } from "lucide-react-native";
import React, { DispatchWithoutAction } from "react";

export const StatsModal = ({
	visible,
	onResolve,
}: {
	visible: boolean;
	onResolve: DispatchWithoutAction;
}) => {
	const [time60] = useStorageState(StorageKey.time60);
	const [static6] = useStorageState(StorageKey.static6);
	const [static8] = useStorageState(StorageKey.static8);
	const [race5] = useStorageState(StorageKey.race5);
	const [disco60] = useStorageState(StorageKey.disco60);
	const [totalSetsFound] = useStorageState(StorageKey.totalSetsFound);
	const [setsFound] = useStorageObjectState<string[]>(StorageKey.setsFound);

	return (
		<AwesomeModal
			visible={visible}
			onResolve={async () => {
				onResolve();
			}}
			header={"Statistics"}
			content={`1-Minute best: ${time60 ?? 0}\n6-Pack wins: ${static6 ?? 0}\n8-Pack wins: ${static8 ?? 0}\nHigh-5 best: ${race5 ?? Infinity}\nDisco best: ${disco60 ?? 0}\nTotal sets found: ${totalSetsFound ?? 0}\n\n${setsFound?.length ?? 0} unique sets found`}
			tailwindColor="bg-purple-500"
			icon={Award}
			backdropOnResolve
		/>
	);
};
