import {createReducer} from "@reduxjs/toolkit";
import {userResetState} from "../actions/stores";
import {updateLastReadAddressState} from "../actions/decoders";
import {DecoderState} from "../../types";

export const initialDecoderState: DecoderState = {
    readAddresses: []
}

export const decoderReducer = createReducer(initialDecoderState, builder => {
    builder.addCase(userResetState, () => initialDecoderState)
    builder.addCase(updateLastReadAddressState, (state, {payload: address}) => {
        state.readAddresses = [address, ...state.readAddresses]
    })
})
