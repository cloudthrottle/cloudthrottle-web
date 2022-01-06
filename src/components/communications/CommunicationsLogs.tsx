import React from 'react';

interface CommunicationsLogsProps {
    logs: string[]
}

export const CommunicationsLogs = ({logs}: CommunicationsLogsProps) => {
    return (
        <ul>
            {logs.map((log, index) => <CommunicationsLog key={index} log={log}/>)}
        </ul>
    )
}

interface CommunicationsLogProps {
    log: string
}

export const CommunicationsLog = ({log}: CommunicationsLogProps) => {
    return (
        <li>{log}</li>
    )
}
