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
	const [oneMinute] = useStorageState(StorageKey.oneMinute, String(0));
	const [sixPack] = useStorageState(StorageKey.sixPack, String(0));
	const [eightPack] = useStorageState(StorageKey.eightPack, String(0));
	const [highFive] = useStorageState(StorageKey.highFive, String(Infinity));
	const [speed] = useStorageState(StorageKey.speed, String(0));
	const [drain] = useStorageState(StorageKey.drain, String(0));
	const [disco] = useStorageState(StorageKey.disco, String(0));
	const [levels] = useStorageState(StorageKey.levels, String(1));
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
			content={`1-Minute best: ${oneMinute}\n6-Pack wins: ${sixPack}\n8-Pack wins: ${eightPack}\nHigh-5 best: ${highFive} seconds\nDrain wins: ${drain}\nSpeed best: ${speed}\nDisco best: ${disco}\nCurrent level: ${levels}\nTotal sets found: ${totalSetsFound}\n\n${setsFound?.length} unique sets found`}
			tailwindColor="bg-purple-500"
			icon={Award}
			backdropOnResolve
		/>
	);
};
