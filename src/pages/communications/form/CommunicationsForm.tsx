import React, {FormEvent} from 'react'
import {SendCommsForm} from "../../../components";
import {HandleSubmit} from "../../../utils";
import {sendLog} from "../../../states";
import {useDispatch} from "react-redux";

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

    return <SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>
}
