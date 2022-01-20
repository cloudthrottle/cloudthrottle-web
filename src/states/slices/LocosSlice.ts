import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {CreateLocoParams, FunctionButtonsState, Loco, LocosState} from "../../types";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";
import {ulid} from "ulidx";

const defaultFunctionButtonsState: FunctionButtonsState = Array.from(Array(30))
    .reduce((previousValue, currentValue, currentIndex) => {
        previousValue[currentIndex.toString()] = {
            value: 0,
            display: `F${currentIndex}`
        }
        return previousValue
    }, {})


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
                    id: ulid().toLowerCase(),
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
        setSpeed: (state, {payload: {loco: {id}, speed}}: PayloadAction<{ loco: Loco, speed: number }>) => {
            const locoIndex = state.findIndex((loco) => loco.id === id)
            state[locoIndex].throttle.speed = speed
        },
        setDirection: (state, {
            payload: {
                loco: {id},
                direction
            }
        }: PayloadAction<{ loco: Loco, direction: number }>) => {
            const locoIndex = state.findIndex((loco) => loco.id === id)
            state[locoIndex].throttle.direction = direction
        },
        setEStop: (state, {payload: {loco: {id}}}: PayloadAction<{ loco: Loco }>) => {
            const locoIndex = state.findIndex((loco) => loco.id === id)
            state[locoIndex].throttle.speed = -1
        },
        setEStopAll: (state: Draft<LocosState>) => {
            state.forEach(loco => loco.throttle.speed = -1)
        },
        setStop: (state, {payload: {loco: {id}}}: PayloadAction<{ loco: Loco }>) => {
            const locoIndex = state.findIndex((loco) => loco.id === id)
            state[locoIndex].throttle.speed = 0
        },
        setButtonValue: (state, {
            payload: {
                loco: {id},
                name: fnName,
                value
            }
        }: PayloadAction<{ loco: Loco, name: number, value: BitValue }>) => {
            const locoIndex = state.findIndex((loco) => loco.id === id)
            state[locoIndex].functionButtons[fnName].value = value
        }
    },
})

// Action creators are generated for each case reducer function
export const {addLoco, setSpeed, setDirection, setEStop, setEStopAll, setStop, setButtonValue} = locosSlice.actions

export default locosSlice.reducer
