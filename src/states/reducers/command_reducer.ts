import {createReducer} from "@reduxjs/toolkit";
import {CommunicationsState, LogItem} from "../../types";
import {addCommandToLog, commandWrite} from "../actions/commands";
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
    builder.addCase(addCommandToLog, (state, {payload}) => {
        const log: LogItem = {
            ...payload,
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
