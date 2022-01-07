import {GlobalState} from "../../contexts";
import {CommunicationsState, LogItem} from "../../types";

export function prependLogItem(setGlobalState: (value: (((prevState: GlobalState) => GlobalState) | GlobalState)) => void, log: LogItem) {
    setGlobalState((prevState) => {
        const {communications: prevComms} = prevState
        const {logs: prevLogs} = prevComms
        const logs = [log, ...prevLogs]
        const communications: CommunicationsState = {...prevComms, logs}
        return {...prevState, communications}
    })
}