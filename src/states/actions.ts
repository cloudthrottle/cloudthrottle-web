import {createAction} from "@reduxjs/toolkit";
import {
    FunctionName,
    genericParser,
    ParserResult,
    RosterItemResult,
    ThrottleResult
} from "@cloudthrottle/dcc-ex--commands";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {AddLocoParams, Loco, Writer} from "../types";

export const commandReceived = createAction<string>('COMMAND_RECEIVED')
export const commandSend = createAction<string>('COMMAND_SEND')
const commandParsedSuccess = createAction<ParserResult<any>>('COMMAND_PARSED_SUCCESS')
const commandParsedFailed = createAction('COMMAND_PARSED_FAILED')
const throttleCommandParsed = createAction<ThrottleResult>('THROTTLE_COMMAND_PARSED')
const rosterItemCommandParsed = createAction<RosterItemResult>('ROSTER_ITEM_COMMAND_PARSED')
export const commandWrite = createAction<string>('COMMAND_WRITE')
export const setCommunicationsWriter = createAction<Writer>('SET_COMMUNICATIONS_WRITER')
export const communicationsConnected = createAction('COMMUNICATIONS_CONNECTED')
export const communicationsDisconnected = createAction('COMMUNICATIONS_DISCONNECTED')
export const rosterItemUpdated = createAction<AddLocoParams>('ROSTER_ITEM_UPDATED')

function* handleParsedCommand({payload}: { type: string, payload: ParserResult<any> }) {
    console.debug("handleParsedCommand", payload);
    if (payload.parser === FunctionName.THROTTLE) {
        yield put(throttleCommandParsed(payload));
    }
    if (payload.parser === FunctionName.ROSTER_ITEM) {
        yield put(rosterItemCommandParsed(payload));
    }
}

function* handleCommandReceived({payload}: { type: string, payload: string }) {
    console.debug("handleCommandReceived", payload);
    console.debug("READ: ", payload)
    const parser = genericParser()

    try {
        const result: ParserResult<any> = yield call(parser.parse, payload);
        yield put(commandParsedSuccess(result));
    } catch (e) {
        yield put(commandParsedFailed());
    }
}

function* handleCommandSend({payload}: { type: string, payload: string }) {
    console.debug("handleCommandSend", payload);
    yield put(commandWrite(payload));
}

function* handleSetCommunicationsWriter({payload}: { type: string, payload: Writer }) {
    console.debug("handleSetCommunicationsWriter", payload);
    if (!!payload) {
        yield put(communicationsConnected())
    } else {
        yield put(communicationsDisconnected())
    }
}

function* handleRosterItemCommandParsed({payload}: {type: string, payload: RosterItemResult}) {
    console.debug("handleRosterItemCommandParsed", payload);
    const {params: {cabId, display, functionButtons}} = payload
    const loco: AddLocoParams = {
        cabId,
        name: display,
        buttons: functionButtons
    }
    yield put(rosterItemUpdated(loco))
}

function* commandSaga() {
    yield takeEvery(commandReceived.type, handleCommandReceived);
    yield takeEvery(commandParsedSuccess.type, handleParsedCommand)
    yield takeEvery(commandSend.type, handleCommandSend)
    yield takeLatest(setCommunicationsWriter.type, handleSetCommunicationsWriter)
    yield takeEvery(rosterItemCommandParsed.type, handleRosterItemCommandParsed)
}

export default commandSaga;