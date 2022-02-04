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
        addLoco: {
            reducer: (state: Draft<LocosState>, {payload: loco}: PayloadAction<Loco>) => {
                updateOrAddLoco({state, loco})
            },
            prepare: ({name, cabId, buttons}: AddLocoParams) => {
                const functionButtons = buildFunctionButtons(buttons)
                const loco: Loco = buildLoco({name, cabId, functionButtons})
                return {payload: loco}
            }
        },
        addRosterLoco: {
            reducer: (state: Draft<LocosState>, {payload: loco}: PayloadAction<Loco>) => {
                return updateOrAddRosterLoco({state, loco})
            },
            prepare: ({name, cabId, buttons}: AddLocoParams) => {
                const functionButtons = buildFunctionButtons(buttons)
                const loco: Loco = buildLoco({
                    name,
                    cabId,
                    functionButtons,
                    sync: {
                        rosterListAt: Date.now(),
                        rosterItemAt: null
                    }
                })
                return {payload: loco}
            }
        },
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
export const {addLoco, addRosterLoco, setSpeed, setDirection, setEStop, setEStopAll, setStop, setButtonValue} = locosSlice.actions

export default locosSlice.reducer
