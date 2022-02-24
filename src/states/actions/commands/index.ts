import {createAction} from "@reduxjs/toolkit";
import {ParserResult, PowerResult, RosterItemResult, ThrottleResult} from "@cloudthrottle/dcc-ex--commands";

export const commandReceived = createAction<string>('COMMAND_RECEIVED')
export const commandSend = createAction<string>('COMMAND_SEND')
export const commandParsedSuccess = createAction<ParserResult<any>>('COMMAND_PARSED_SUCCESS')
export const commandParsedFailed = createAction('COMMAND_PARSED_FAILED')
export const throttleCommandParsed = createAction<ThrottleResult>('THROTTLE_COMMAND_PARSED')
export const rosterItemCommandParsed = createAction<RosterItemResult>('ROSTER_ITEM_COMMAND_PARSED')
export const powerCommandParsed = createAction<PowerResult>('POWER_COMMAND_PARSED')
export const commandWrite = createAction<string>('COMMAND_WRITE')