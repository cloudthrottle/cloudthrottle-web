import React, {FormEvent} from 'react'
import {SendCommsForm} from "../../../components";
import {HandleSubmit} from "../../../utils";
import {useGlobalContext} from "../../../contexts";

export const CommunicationsForm = () => {
    const [{communications: {writer}}] = useGlobalContext();

    const handleCommandSendSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleCommandSendSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const command = formData.get('command')
        if (!writer || !command) {
            return
        }
        await writer.write(command.toString())
    }

    return <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
}