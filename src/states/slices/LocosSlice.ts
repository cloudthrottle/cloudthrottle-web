import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Loco, LocosState} from "../../types";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";

const initialState: LocosState = {
    entities: {}
}

export const locosSlice = createSlice({
    name: 'locos',
    initialState,
    reducers: {
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
    setButtonValue
} = locosSlice.actions

export default locosSlice.reducer
