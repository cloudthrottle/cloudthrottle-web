import {createReducer} from "@reduxjs/toolkit";
import {TurnoutsState} from "../../types";
import {userResetState} from "../actions/stores";
import {addOrUpdateTurnout, updateTurnoutPosition} from "../actions/turnouts";
import {buildTurnout, mergeTurnout} from "../../repositories/turnouts";

const initialState: TurnoutsState = {
    entities: {}
}

export const turnoutsReducer = createReducer(initialState, builder => {
    builder.addCase(userResetState, () => initialState)

    builder.addCase(addOrUpdateTurnout, (state, {payload}) => {
        const {id} = payload

        if (state.entities.hasOwnProperty(id)) {
            const existingTurnout = state.entities[id]
            state.entities[id] = mergeTurnout({turnout: payload, existingTurnout: existingTurnout})
        } else {
            state.entities[id] = buildTurnout(payload)
        }
    })

    builder.addCase(updateTurnoutPosition, (state, {payload}) => {
        const {turnout: {id}, position} = payload

        if (state.entities.hasOwnProperty(id)) {
            const existingTurnout = state.entities[id]
            state.entities[id] = {
                ...existingTurnout,
                position
            }
        }
    })
})
