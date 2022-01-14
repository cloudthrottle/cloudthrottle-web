import React, {FormEvent} from 'react'
import {SendCommsForm} from "../../../components";
import {HandleSubmit, prependLogItem} from "../../../utils";
import {addLog, useGlobalContext} from "../../../contexts";
import {LogItem} from "../../../types";
import {useDispatch} from "react-redux";

export const CommunicationsForm = () => {
    const [{communications: {writer}}] = useGlobalContext();
    const dispatch = useDispatch()

    const handleCommandSendSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleCommandSendSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const command = formData.get('command')
        if (!writer || !command) {
            return
        }

        const log: LogItem = {
            kind: "sent",
            message: command.toString()
        }

        dispatch(addLog(log))
        await writer.write(command.toString())
    }

    return <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
}
