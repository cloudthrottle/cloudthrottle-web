import {createReducer} from "@reduxjs/toolkit";
import {userResetState} from "../actions/stores";
import {updateLastReadAddressState} from "../actions/decoders";
import {DecoderState} from "../../types";

const initialState: DecoderState = {
    readAddresses: []
}

export const decoderReducer = createReducer(initialState, builder => {
    builder.addCase(userResetState, () => initialState)
    builder.addCase(updateLastReadAddressState, (state, {payload: address}) => {
        state.readAddresses = [address, ...state.readAddresses]
    })
})