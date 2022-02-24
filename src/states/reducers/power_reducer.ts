import {createReducer} from '@reduxjs/toolkit'
import {PowersState} from "../../types/powers";
import {Track} from "@cloudthrottle/dcc-ex--commands";
import {updatePowerState} from "../actions/powers";
import {userResetState} from "../actions/stores";

const initialState: PowersState = {
    JOIN: 0,
    MAIN: 0,
    PROG: 0
}

export const powersReducer = createReducer(initialState, builder => {
    builder.addCase(userResetState, () => initialState)
    builder.addCase(updatePowerState, (state, {payload: power}) => {
        state[Track.JOIN] = power
        state[Track.MAIN] = power
        state[Track.PROG] = power
    })
})

