import React from 'react'
import {SendCommsForm, SendCommsFormProps} from "../../../components";

type CommunicationsFormProps = SendCommsFormProps
export const CommunicationsForm = ({handleCommandSendSubmit}: CommunicationsFormProps) => {
    return <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
}