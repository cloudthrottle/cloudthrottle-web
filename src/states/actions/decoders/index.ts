import {createAction} from "@reduxjs/toolkit";
import {DecoderAddressResult} from "@cloudthrottle/dcc-ex--commands";

export const userDecoderReadAddress = createAction('USER_DECODER_READ_ADDRESS')
export const createDecoderReadAddressCommand = createAction('CREATE_DECODER_READ_ADDRESS_COMMAND')
export const decoderReadAddressCommandParsed = createAction<DecoderAddressResult>('DECODER_READ_ADDRESS_COMMAND_PARSED')
export const updateLastReadAddressState = createAction<number | null>('UPDATE_LAST_READ_ADDRESS_STATE')
