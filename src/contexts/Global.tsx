import React, {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";
import {CommunicationsState, LocosState} from "../types";

export type GlobalState = {
    communications: CommunicationsState,
    locos: LocosState
}

const initialState: GlobalState = {
    communications: {
        writer: null,
        logs: []
    },
    locos: []
}

type ContextType<S> = [S, React.Dispatch<React.SetStateAction<S>>] | null;
const GlobalContext = createContext<ContextType<GlobalState>>(null)

function useGlobalContext() {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error(`useGlobalContext must be used within a GlobalProvider`)
    }
    return context
}

function GlobalProvider(props: PropsWithChildren<any>) {
    const [globalState, setGlobalState] = useState(initialState)
    const value = useMemo(() => [globalState, setGlobalState], [globalState])
    return <GlobalContext.Provider value={value} {...props} />
}

export {GlobalProvider, useGlobalContext}
