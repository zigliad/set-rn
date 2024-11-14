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
	const [time60] = useStorageState(StorageKey.time60, String(0));
	const [static6] = useStorageState(StorageKey.static6, String(0));
	const [static8] = useStorageState(StorageKey.static8, String(0));
	const [race5] = useStorageState(StorageKey.race5, String(Infinity));
	const [race3_12] = useStorageState(StorageKey.race3_12, String(0));
	const [drain] = useStorageState(StorageKey.drain, String(0));
	const [speed10_5] = useStorageState(StorageKey.speed10_5, String(0));
	const [disco60] = useStorageState(StorageKey.disco60, String(0));
	const [level] = useStorageState(StorageKey.levels, String(1));
	const [totalSetsFound] = useStorageState(
		StorageKey.totalSetsFound,
		String(0)
	);
	const [setsFound] = useStorageObjectState<string[]>(
		StorageKey.setsFound,
		[]
	);

	return (
		<AwesomeModal
			visible={visible}
			onResolve={async () => {
				onResolve();
			}}
			header={"Statistics"}
			content={`1-Minute best: ${time60}\n6-Pack wins: ${static6}\n8-Pack wins: ${static8}\nHigh-5 best: ${race5} seconds\nDrain wins: ${drain}\nSpeed best: ${speed10_5}\nDisco best: ${disco60}\nSprint wins: ${race3_12}\nCurrent level: ${level}\nTotal sets found: ${totalSetsFound}\n\n${setsFound?.length} unique sets found`}
			tailwindColor="bg-purple-500"
			icon={Award}
			backdropOnResolve
		/>
	);
};
