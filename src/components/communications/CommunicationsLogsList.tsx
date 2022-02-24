import React from 'react';
import {Logs} from "../../types";
import {CommunicationsLog} from "./CommunicationsLog";

interface CommunicationsLogsListProps {
    logs: Logs
}

export const CommunicationsLogsList = ({logs}: CommunicationsLogsListProps) => {
    if (!logs.length) {
        return <EmptyCommunicationsLogsList/>
    }

    return (
        <div>
            {logs.map((log, index) => <CommunicationsLog key={index} log={log}/>)}
        </div>
    )
}

const EmptyCommunicationsLogsList = () => {
    return (
        <p><small>Waiting for communications...</small></p>
    )
}
