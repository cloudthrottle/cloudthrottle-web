import {createReducer} from "@reduxjs/toolkit";
import {CommunicationsState, LogItem} from "../../types";
import {commandReceived, commandSend, commandWrite} from "../actions/commands";
import {setCommunicationsWriter, userClearCommunicationLogs} from "../actions/communications";
import {userResetState} from "../actions/stores";

const initialState: CommunicationsState = {
  logs: [],
  writer: null,
  connected: false
}

export const commandReducer = createReducer(initialState, builder => {
  builder.addCase(userResetState, () => initialState)
  builder.addCase(userClearCommunicationLogs, (state) => {
    state.logs = []
  })
  builder.addCase(commandReceived, (state, {payload}) => {
    const log: LogItem = {
      kind: "received",
      message: payload,
      timestamps: {
        createdAt: Date.now()
      }
    }
    state.logs = [log, ...state.logs]
  })
  builder.addCase(commandSend, (state, {payload}) => {
    const log: LogItem = {
      kind: "sent",
      message: payload,
      timestamps: {
        createdAt: Date.now()
      }
    }
    state.logs = [log, ...state.logs]
  })
    builder.addCase(commandWrite, ({writer}, {payload}) => {
        if (writer) {
            void writer.write(payload)
            return
        } else {
            console.debug("WRITE:", payload)
        }
    })
    builder.addCase(setCommunicationsWriter, (state, {payload}) => {
        state.writer = payload
    })
})
