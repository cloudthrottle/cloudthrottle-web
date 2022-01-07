import React, {FormEvent} from 'react'
import {SendCommsForm} from "../../../components";
import {HandleSubmit, prependLogItem} from "../../../utils";
import {useGlobalContext} from "../../../contexts";
import {LogItem} from "../../../types";

export const CommunicationsForm = () => {
    const [{communications: {writer}}, setGlobalState] = useGlobalContext();

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
        prependLogItem(setGlobalState, log)
        await writer.write(command.toString())
    }

    return <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
}