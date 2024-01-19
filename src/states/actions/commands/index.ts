import {createAction} from "@reduxjs/toolkit";
import {
    ParserResult,
    PowerResult,
    RosterItemResult,
    RosterListResult,
    ThrottleResult
} from "@cloudthrottle/dcc-ex--commands";
import {LogItemKind} from "../../../types";

export const commandReceived = createAction<string>('COMMAND_RECEIVED')
export const commandSend = createAction<string>('COMMAND_SEND')
export const commandParsedSuccess = createAction<ParserResult<any>>('COMMAND_PARSED_SUCCESS')
export const commandParsedFailed = createAction('COMMAND_PARSED_FAILED')
export const throttleCommandParsed = createAction<ThrottleResult>('THROTTLE_COMMAND_PARSED')
export const rosterListCommandParsed = createAction<RosterListResult>('ROSTER_LIST_COMMAND_PARSED')
export const rosterItemCommandParsed = createAction<RosterItemResult>('ROSTER_ITEM_COMMAND_PARSED')
export const powerCommandParsed = createAction<PowerResult>('POWER_COMMAND_PARSED')
export const commandWrite = createAction<string>('COMMAND_WRITE')
export const addCommandToLog = createAction<{ kind: LogItemKind, message: string }>('ADD_COMMAND_TO_LOG')
