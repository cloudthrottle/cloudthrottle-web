import {createReducer} from "@reduxjs/toolkit";
import {LocosState} from "../../types";
import {rosterItemUpdated} from "../actions";
import {buildLoco, mergeLoco} from "../../repositories/locos";

const initialState: LocosState = {
    entities: {}
}

export const rostersReducer = createReducer(initialState, builder => {
    builder.addCase(rosterItemUpdated, (state, {payload}) => {
        const {cabId} = payload

        if (state.entities.hasOwnProperty(cabId)) {
            const existingLoco = state.entities[cabId]
            state.entities[cabId] = mergeLoco({loco: payload, existingLoco})
        } else {
            state.entities[cabId] = buildLoco(payload)
        }
    })
})