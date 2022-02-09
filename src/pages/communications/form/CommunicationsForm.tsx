import React, {FormEvent} from 'react'
import {FakeReadCommsForm, SendCommsForm} from "../../../components";
import {sendLog} from "../../../states";
import {useDispatch} from "react-redux";
import {HandleSubmit} from "../../../types";
import {readHandler} from "../../../utils";
import {commandReceived, commandSend} from "../../../states/actions";

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

        dispatch(commandSend(command.toString()))

        // @ts-ignore
        target.reset()
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

        dispatch(commandReceived(command.toString()))

        // @ts-ignore
        target.reset()
    }

    return (
        <div className="comms-forms">
            <FakeReadCommsForm onSubmit={handleCommandFakeReadSubmit}/>
            <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
        </div>
    )
}
