import {createReducer} from "@reduxjs/toolkit";
import {LocosState} from "../../types";
import {buildLoco, mergeLoco} from "../../repositories/locos";
import {addOrUpdateLoco, rosterItemUpdated} from "../actions/locos";

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
})