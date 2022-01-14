import React, {FormEvent} from 'react'
import {SendCommsForm} from "../../../components";
import {HandleSubmit} from "../../../utils";
import {addLog, RootState} from "../../../contexts";
import {LogItem} from "../../../types";
import {useDispatch, useSelector} from "react-redux";

export const CommunicationsForm = () => {
    const writer = useSelector((state: RootState) => {
      return state.communications.writer;
    })
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
