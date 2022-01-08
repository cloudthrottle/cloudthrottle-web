import {CommunicationsState, LogItem, SetGlobalState} from "../../types";

export function prependLogItem(setGlobalState: SetGlobalState, log: LogItem) {
    setGlobalState((prevState) => {
        const {communications: prevComms} = prevState
        const {logs: prevLogs} = prevComms
        const logs = [log, ...prevLogs]
        const communications: CommunicationsState = {...prevComms, logs}
        return {...prevState, communications}
    })
}