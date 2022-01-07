import React from "react";
import {LogItem} from "../../types";

interface CommunicationsLogProps {
    log: LogItem
}

export const CommunicationsLog = ({log}: CommunicationsLogProps) => {
    return (
        <li><span><strong>{log.kind}:</strong></span> {log.message}</li>
    )
}