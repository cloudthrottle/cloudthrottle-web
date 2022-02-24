import React from "react";
import {LogItem} from "../../types";

interface CommunicationsLogProps {
    log: LogItem
}

export const CommunicationsLog = ({log}: CommunicationsLogProps) => {
    const createdAt = new Date(log.timestamps.createdAt)

    return (
        <details>
            <summary>
                <strong>{log.kind}:</strong> {log.message}
            </summary>
            <small>{createdAt.toLocaleString()}</small>
        </details>
    )
}
