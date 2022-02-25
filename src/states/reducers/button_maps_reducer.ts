import {createReducer} from '@reduxjs/toolkit'
import {userResetState} from "../actions/stores";
import {addOrUpdateMap} from "../actions/button_maps";
import {FunctionButtonMap} from "../../types";
import {buildFunctionButtons} from "../../repositories/locos";

type ButtonMapsState = {
    entities: {
        [display: string]: FunctionButtonMap
    }
}
const initialState: ButtonMapsState = {
    entities: {
        default: {
            display: "Default",
            functionButtons: buildFunctionButtons()
        }
    }
}

export const buttonMapsReducer = createReducer(initialState, builder => {
    builder.addCase(userResetState, () => initialState)
    builder.addCase(addOrUpdateMap, (state, {payload}) => {
        const {display: rawLookupKey} = payload
        const lookupKey = rawLookupKey.toLowerCase()

        if (state.entities.hasOwnProperty(lookupKey)) {
            const existingMap = state.entities[lookupKey]
            state.entities[lookupKey] = {
                ...existingMap,
                ...payload
            }
        } else {
            state.entities[lookupKey] = payload
        }
    })
})

