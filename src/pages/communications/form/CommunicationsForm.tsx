import React, {FormEvent} from 'react'
import {FakeReadCommsForm, readHandler, SendCommsForm} from "../../../components";
import {sendLog} from "../../../states";
import {useDispatch} from "react-redux";
import {HandleSubmit} from "../../../types";

export const CommunicationsForm = () => {
    const dispatch = useDispatch()

    const handleCommandSendSubmit: HandleSubmit = (event: FormEvent) => {
        console.debug("handleCommandSendSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const command = formData.get('command')
        if (!command) {
            return
        }

        dispatch(sendLog(command.toString()))
    }

    const handleCommandFakeReadSubmit: HandleSubmit = (event: FormEvent) => {
        console.debug("handleCommandFakeReadSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const command = formData.get('command')
        if (!command) {
            return
        }

        const handleRead = readHandler(dispatch);
        handleRead(command.toString())
    }

    return (
        <>
            <FakeReadCommsForm onSubmit={handleCommandFakeReadSubmit}/>
            <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
        </>
    )
}
