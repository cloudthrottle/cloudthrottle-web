import React from 'react';

interface CommsLogsProps {
    logs: string[]
}

export const CommsLogs = ({logs}: CommsLogsProps) => {
    return (
        <ul>
            {logs.map((log, index) => <CommsLog key={index} log={log} />)}
        </ul>
    )
}

interface CommsLogProps {
    log: string
}

export const CommsLog = ({log}: CommsLogProps) => {
    return (
        <li>{log}</li>
    )
}
