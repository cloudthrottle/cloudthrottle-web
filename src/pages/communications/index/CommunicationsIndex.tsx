import React from 'react'
import {CommunicationsLogsList} from "../../../components";
import {useGlobalContext} from "../../../contexts";

export const CommunicationsIndex = () => {
    const [{communications: {logs}}] = useGlobalContext();
    return <CommunicationsLogsList logs={logs}/>
}