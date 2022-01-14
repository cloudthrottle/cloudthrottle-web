import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {CommunicationsState, Loco, Locos, LocosState, LogItem} from "../../types";
import {CreateLocoParams} from "../../utils/locos";


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
    }
  },
})

// Action creators are generated for each case reducer function
export const {addLog} = communicationsSlice.actions

export default communicationsSlice.reducer
