import { DEFAULT_SETS_FOUND } from "@/app/setsFound";
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
	const [highFive] = useStorageState(StorageKey.highFive, String(Infinity));
	const [eightPack] = useStorageState(StorageKey.eightPack, String(0));
	const [drain] = useStorageState(StorageKey.drain, String(0));
	const [survival] = useStorageState(StorageKey.survival, String(0));
	const [disco] = useStorageState(StorageKey.disco, String(0));
	const [speed] = useStorageState(StorageKey.speed, String(0));
	const [levels] = useStorageState(StorageKey.levels, String(1));
	const [mania] = useStorageState(StorageKey.mania, String(0));
	const [expert] = useStorageState(StorageKey.expert, String(0));
	const [totalSetsFound] = useStorageState(
		StorageKey.totalSetsFound,
		String(0)
	);
	const [setsFound] = useStorageObjectState<string[]>(
		StorageKey.setsFound,
		DEFAULT_SETS_FOUND
	);

	return (
		<AwesomeModal
			visible={visible}
			onResolve={async () => {
				onResolve();
			}}
			header={"Statistics"}
			content={`1-Minute best: ${oneMinute}\n6-Pack wins: ${sixPack}\nHigh-5 best: ${+highFive === Infinity ? "N/A" : `${highFive} seconds`}\n8-Pack wins: ${eightPack}\nDrain wins: ${drain}\nSurvival best: ${survival}\nDisco best: ${disco}\nSpeed best: ${speed}\nCurrent level: ${levels}\nMania wins: ${mania}\nExpert best: ${expert}\nTotal sets found: ${(+totalSetsFound).toLocaleString()}\n\n${setsFound?.length.toLocaleString()} unique sets found`}
			tailwindColor="bg-purple-500"
			icon={Award}
			backdropOnResolve
		/>
	);
};
