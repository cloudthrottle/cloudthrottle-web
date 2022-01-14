import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {FunctionButtonsState, Loco, LocosState} from "../../types";
import {CreateLocoParams} from "../../utils/locos";

const defaultFunctionButtonsState: FunctionButtonsState = Array.from(Array(30)).map((value, index) => {
  return {
    name: index,
    value,
    display: `F${index}`
  }
})

const initialState: LocosState = []

export const locosSlice = createSlice({
  name: 'locos',
  initialState,
  reducers: {
    addLoco: {
      reducer: (state: Draft<LocosState>, action: PayloadAction<Loco>) => {
        state.push(action.payload)
      },
      prepare: ({name, cabId}: CreateLocoParams) => {
        const loco: Loco = {
          name,
          cabId,
          throttle: {
            speed: 0,
            direction: 1
          },
          functionButtons: defaultFunctionButtonsState
        }
        return {payload: loco}
      }
    },
    setSpeed: (state, {payload: {loco: {name}, speed}}: PayloadAction<{ loco: Loco, speed: number }>) => {
      const locoIndex = state.findIndex((loco) => loco.name === name)
      state[locoIndex].throttle.speed = speed
      //  TODO: I want to call the `sendLog()` action in the `CommandsSlice` from here
    },
    setDirection: (state, {payload: {loco: {name}, direction}}: PayloadAction<{ loco: Loco, direction: number }>) => {
      const locoIndex = state.findIndex((loco) => loco.name === name)
      state[locoIndex].throttle.direction = direction
      //  TODO: I want to call the `sendLog()` action in the `CommandsSlice` from here
    },
    setEStop: (state, {payload: {loco: {name}}}: PayloadAction<{ loco: Loco }>) => {
      const locoIndex = state.findIndex((loco) => loco.name === name)
      state[locoIndex].throttle.speed = -1
      //  TODO: I want to call the `sendLog()` action in the `CommandsSlice` from here
    },
    setStop: (state, {payload: {loco: {name}}}: PayloadAction<{ loco: Loco }>) => {
      const locoIndex = state.findIndex((loco) => loco.name === name)
      state[locoIndex].throttle.speed = 0
      //  TODO: I want to call the `sendLog()` action in the `CommandsSlice` from here
    }
  },
})

// Action creators are generated for each case reducer function
export const {addLoco, setSpeed, setDirection, setEStop, setStop} = locosSlice.actions

export default locosSlice.reducer
