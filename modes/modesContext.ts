import { Mode } from "@/modes/modeTypes";
import { createContext, useContext } from "react";

export const ModeContext = createContext<Mode>({} as any);
export const useMode = () => useContext(ModeContext);
