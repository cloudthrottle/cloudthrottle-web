import React from 'react'
import {CommunicationsLogsList} from "../../../components";
import {RootState, useGlobalContext} from "../../../contexts";
import {useSelector} from "react-redux";

export const CommunicationsIndex = () => {
    const {logs} = useSelector((state: RootState) => {
        console.log(state);
        return state.communications;
    })
    return <CommunicationsLogsList logs={logs}/>
}
