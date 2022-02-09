import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {AddLocoParams, Loco, LocosState} from "../../types";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";
import {buildFunctionButtons, buildLoco, updateOrAddLoco, updateOrAddRosterLoco} from "../../repositories/locos";

const initialState: LocosState = {
    entities: {}
}

export const locosSlice = createSlice({
    name: 'locos',
    initialState,
    reducers: {
        setSpeed: (state, {payload: {loco, speed}}: PayloadAction<{ loco: Loco, speed: number }>) => {
            state.entities[loco.cabId].throttle.speed = speed
        },
        setDirection: (state, {
            payload: {
                loco,
                direction
            }
        }: PayloadAction<{ loco: Loco, direction: number }>) => {
            state.entities[loco.cabId].throttle.direction = direction
        },
        setEStop: (state, {payload: {loco}}: PayloadAction<{ loco: Loco }>) => {
            state.entities[loco.cabId].throttle.speed = -1
        },
        setEStopAll: (state: Draft<LocosState>) => {
            Object.values(state.entities).forEach(loco => loco.throttle.speed = -1)
        },
        setStop: (state, {payload: {loco}}: PayloadAction<{ loco: Loco }>) => {
            state.entities[loco.cabId].throttle.speed = 0
        },
        setButtonValue: (state, {
            payload: {
                loco,
                name: fnName,
                value
            }
        }: PayloadAction<{ loco: Loco, name: number, value: BitValue }>) => {
            state.entities[loco.cabId].functionButtons[fnName].value = value
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setSpeed,
    setDirection,
    setEStop,
    setEStopAll,
    setStop,
    setButtonValue
} = locosSlice.actions

export default locosSlice.reducer
