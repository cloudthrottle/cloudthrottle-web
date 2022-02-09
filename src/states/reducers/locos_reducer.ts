import {createReducer} from "@reduxjs/toolkit";
import {AddLocoParams, Loco, LocosState} from "../../types";
import {rosterItemUpdated} from "../actions";
import {buildLoco} from "../../repositories/locos";

const initialState: LocosState = {
    entities: {}
}

export const rostersReducer = createReducer(initialState, builder => {
    builder.addCase(rosterItemUpdated, (state, {payload}) => {
        console.log("locosReducer", payload);
        const {name, cabId, buttons: functionButtons} = payload

        if (state.entities.hasOwnProperty(cabId)) {
            // const existingLoco: Loco = state.entities[cabId]
            // const existingLocoButtons = existingLoco.functionButtons
            // const newButtons = {
            //
            // }
            // state.entities[cabId] = {
            //     ...existingLoco,
            //
            // }
        } else {
            state.entities[cabId] = buildLoco({name, cabId, functionButtons})
        }
    })
})