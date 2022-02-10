import {createReducer} from "@reduxjs/toolkit";
import {LocosState} from "../../types";
import {buildLoco, mergeLoco} from "../../repositories/locos";
import {addOrUpdateLoco} from "../actions/locos";
import {updateThrottleState} from "../actions/throttles";

const initialState: LocosState = {
    entities: {}
}

export const rostersReducer = createReducer(initialState, builder => {
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
    // builder.addCase(updateFunctionButtonState, (state, {payload}) => {
    // const {loco: {cabId}, functionButton} = payload
    // const {throttle: existingLocoThrottle} = state.entities[cabId]
    // state.entities[cabId].throttle = {
    //     ...existingLocoThrottle,
    //     ...throttle
    // }
    // })
})