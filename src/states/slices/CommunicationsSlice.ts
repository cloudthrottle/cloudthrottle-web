import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {CommunicationsState, LogItem, Writer} from "../../types";


const initialState: CommunicationsState = {
    logs: [],
    writer: null,
    connected: false
}

function writeToComms(writer: Writer, message: string) {
    if (writer) {
        void writer.write(message)
        return
    } else {
        console.debug("WRITE:", message)
    }
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
            state.connected = true
        },
        sendLog: (state: Draft<CommunicationsState>, {payload: message}: PayloadAction<string>) => {
            const logItem: LogItem = {
                kind: "sent",
                message
            }
            state.logs = [logItem, ...state.logs]
            writeToComms(state.writer, message);
        }
    }
})

// Action creators are generated for each case reducer function
export const {addLog, setWriter, sendLog} = communicationsSlice.actions

export default communicationsSlice.reducer
