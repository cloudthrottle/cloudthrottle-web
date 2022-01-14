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
    }
  },
})

// Action creators are generated for each case reducer function
export const {addLog, setWriter} = communicationsSlice.actions

export default communicationsSlice.reducer
