import React from 'react'
import {CommunicationsLogsList} from "../../../components";
import {RootState} from "../../../states";
import {useSelector} from "react-redux";

export const CommunicationsIndex = () => {
    const {logs} = useSelector((state: RootState) => state.communications)
    return <CommunicationsLogsList logs={logs}/>
}
