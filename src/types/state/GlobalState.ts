import {CommunicationsState} from "../communications";
import {LocosState} from "../locos";

export type GlobalState = {
    communications: CommunicationsState,
    locos: LocosState
}

export type SetGlobalState = (value: (((prevState: GlobalState) => GlobalState) | GlobalState)) => void;