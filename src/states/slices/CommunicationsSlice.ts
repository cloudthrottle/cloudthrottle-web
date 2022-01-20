import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {CommunicationsState, LogItem} from "../../types";


const initialState: CommunicationsState = {
    logs: [],
    writer: null
}

export const communicationsSlice = createSlice({
    name: 'communications',
    initialState,
    reducers: {
        addLog: (state: Draft<CommunicationsState>, action: PayloadAction<LogItem>) => {
            state.logs = [action.payload, ...state.logs]
        },
        setWriter: (state, action) => {
            state.writer = action.payload
        },
        sendLog: (state, {payload: message}: PayloadAction<string>) => {
            if (!state.writer) {
                return
            }

            const logItem: LogItem = {
                kind: "sent",
                message
            }
            state.logs = [logItem, ...state.logs]
            void state.writer.write(message)
        }
    }
})

// Action creators are generated for each case reducer function
export const {addLog, setWriter, sendLog} = communicationsSlice.actions

export default communicationsSlice.reducer
