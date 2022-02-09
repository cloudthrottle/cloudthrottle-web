import {createReducer} from "@reduxjs/toolkit";
import {CommunicationsState, LogItem} from "../../types";
import {commandReceived, commandSend, commandWrite} from "../actions/commands";
import {setCommunicationsWriter} from "../actions/communications";

const initialState: CommunicationsState = {
    logs: [],
    writer: null,
    connected: false
}

export const commandReducer = createReducer(initialState, builder => {
    builder.addCase(commandReceived, (state, {payload}) => {
        const log: LogItem = {
            kind: "received",
            message: payload
        }
        state.logs = [log, ...state.logs]
    })
    builder.addCase(commandSend, (state, {payload}) => {
        const log: LogItem = {
            kind: "sent",
            message: payload
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