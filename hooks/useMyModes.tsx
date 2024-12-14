import { useStorageObjectState } from "@/hooks/useStorageState";
import { Modes } from "@/modes/modes";
import { StorageKey } from "@/utils/storage";
import { createContext, useContext } from "react";

export type MyModesContextType = {
	myModes: Modes[];
	setMyModes: (modes: Modes[]) => void;
};

export const MyModesContext = createContext<MyModesContextType>(
	{} as MyModesContextType
);

export const DEFAULT_MY_MODES: Modes[] = ["oneMinute", "sixPack", "highFive"];

export const useInitMyModes = () => {
	const [myModes, setMyModes] = useStorageObjectState<Modes[]>(
		StorageKey.myModes,
		DEFAULT_MY_MODES
	);
	return { myModes, setMyModes };
};

export const useMyModes = () => useContext(MyModesContext);
