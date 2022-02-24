import {createReducer} from "@reduxjs/toolkit";
import {LocosState} from "../../types";
import {buildLoco, mergeLoco} from "../../repositories/locos";
import {addOrUpdateLoco} from "../actions/locos";
import {updateFunctionButtonState, updateThrottleState} from "../actions/throttles";
import {userResetState} from "../actions/stores";

const initialState: LocosState = {
    entities: {}
}

export const rostersReducer = createReducer(initialState, builder => {
    builder.addCase(userResetState, () => initialState)
    builder.addCase(addOrUpdateLoco, (state, {payload}) => {
        const {cabId} = payload

        if (state.entities.hasOwnProperty(cabId)) {
            const existingLoco = state.entities[cabId]
            state.entities[cabId] = mergeLoco({loco: payload, existingLoco})
        } else {
            state.entities[cabId] = buildLoco(payload)
        }
    })
    builder.addCase(updateThrottleState, (state, {payload}) => {
        const {loco: {cabId}, throttle} = payload
        const {throttle: existingLocoThrottle} = state.entities[cabId]
        state.entities[cabId].throttle = {
            ...existingLocoThrottle,
            ...throttle
        }
    })
    builder.addCase(updateFunctionButtonState, (state, {payload}) => {
        const {loco: {cabId}, functionButtons} = payload
        Object.entries(functionButtons).forEach(([name, button]) => {
            const currentButton = state.entities[cabId].functionButtons[parseInt(name)]
            state.entities[cabId].functionButtons[parseInt(name)] = {
                ...currentButton,
                ...button
            }
        })
    })
})
