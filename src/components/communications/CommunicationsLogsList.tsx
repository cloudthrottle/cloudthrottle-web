import React from 'react';
import {Logs} from "../../types";
import {CommunicationsLog} from "./CommunicationsLog";

interface CommunicationsLogsListProps {
    logs: Logs
}

export const CommunicationsLogsList = ({logs}: CommunicationsLogsListProps) => {
    return (
        <ul>
            {logs.map((log, index) => <CommunicationsLog key={index} log={log}/>)}
        </ul>
    )
}