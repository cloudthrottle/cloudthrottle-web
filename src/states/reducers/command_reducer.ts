import {createReducer} from "@reduxjs/toolkit";
import {CommunicationsState, LogItem} from "../../types";
import {addCommandToLog, commandWrite} from "../actions/commands";
import {communicationsConnected, setCommunicationsWriter, userClearCommunicationLogs} from "../actions/communications";
import {userResetState} from "../actions/stores";

const initialState: CommunicationsState = {
    logs: [],
    writer: null,
    connected: !!window.writer,
}

export const commandReducer = createReducer(initialState, builder => {
    builder.addCase(userResetState, () => initialState)
    builder.addCase(userClearCommunicationLogs, (state) => {
        state.logs = []
    })
    builder.addCase(addCommandToLog, (state, {payload}) => {
        const log: LogItem = {
            ...payload,
            timestamps: {
                createdAt: Date.now()
            }
        }
        state.logs = [log, ...state.logs]
    })
    builder.addCase(commandWrite, ({connected}, {payload}) => {
        if (connected) {
            void window.writer?.write(payload)
            return
        } else {
            console.debug("WRITE:", payload)
        }
    })
    builder.addCase(communicationsConnected, (state) => {
        state.connected = true;
    })
})
