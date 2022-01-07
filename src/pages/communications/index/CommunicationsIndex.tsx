import React from 'react'
import {CommunicationsLogs} from "../../../components";
import {useGlobalContext} from "../../../contexts";

export const CommunicationsIndex = () => {
    const [{communications: {logs}}] = useGlobalContext();
    return <CommunicationsLogs logs={logs}/>
}