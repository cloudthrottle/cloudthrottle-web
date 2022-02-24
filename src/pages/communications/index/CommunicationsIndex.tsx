import React from 'react'
import {ClearLogsForm, CommunicationsLogsList} from "../../../components";
import {RootState} from "../../../states";
import {useSelector} from "react-redux";

export const CommunicationsIndex = () => {
  const {logs} = useSelector((state: RootState) => state.communications)
  return (
    <>
      <ClearLogsForm/>
      <CommunicationsLogsList logs={logs}/>
    </>
  )
}
