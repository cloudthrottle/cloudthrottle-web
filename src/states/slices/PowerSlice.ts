import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PowersState} from "../../types/powers";
import {Track} from "@cloudthrottle/dcc-ex--commands";
import {Active} from "@cloudthrottle/dcc-ex--commands/lib/types/types";


const initialState: PowersState = {
    JOIN: 0,
    MAIN: 0,
    PROG: 0
}

export const powerSlice = createSlice({
    name: 'powers',
    initialState,
    reducers: {
        setAllPower: (state, {payload: power}: PayloadAction<Active>) => {
            state[Track.JOIN] = power
            state[Track.MAIN] = power
            state[Track.PROG] = power
        },
    }
})

// Action creators are generated for each case reducer function
export const {setAllPower} = powerSlice.actions

export default powerSlice.reducer
