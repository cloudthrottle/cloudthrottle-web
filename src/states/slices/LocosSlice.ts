import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {CreateLocoParams, Loco, LocosState, PartialFunctionButtons} from "../../types";
import {BitValue, FunctionButtonKind, FunctionButtons} from "@cloudthrottle/dcc-ex--commands";
import {v4 as uuid} from "uuid"

const initialState: LocosState = []

const functionButtonsState = (buttons: PartialFunctionButtons = []): FunctionButtons => {
    return Array(29).fill(null)
        .reduce((acc, currentValue, currentIndex) => {
            const buttonData = buttons[currentIndex]

            acc[currentIndex] = {
                value: 0,
                display: `F${currentIndex}`,
                kind: FunctionButtonKind.TOGGLE,
                ...buttonData
            }
            return acc
        }, {} as FunctionButtons);
};

export const locosSlice = createSlice({
    name: 'locos',
    initialState,
    reducers: {
        addLoco: {
            reducer: (state: Draft<LocosState>, action: PayloadAction<Loco>) => {
                state.push(action.payload)
            },
            prepare: ({name, cabId, buttons}: CreateLocoParams) => {
                const functionButtons = functionButtonsState(buttons)

                const loco: Loco = {
                    id: uuid(),
                    name,
                    cabId,
                    throttle: {
                        speed: 0,
                        direction: 1
                    },
                    functionButtons
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
