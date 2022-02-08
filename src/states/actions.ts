import {createAction} from "@reduxjs/toolkit";
import {
    FunctionName,
    genericParser,
    ParserResult,
    RosterItemResult,
    ThrottleResult
} from "@cloudthrottle/dcc-ex--commands";
import {call, put, takeEvery} from 'redux-saga/effects'

export const commandReceived = createAction<string>('COMMAND_RECEIVED')
const commandParsedSuccess = createAction<ParserResult<any>>('COMMAND_PARSED_SUCCESS')
const commandParsedFailed = createAction('COMMAND_PARSED_FAILED')

const throttleCommandParsed = createAction<ThrottleResult>('THROTTLE_COMMAND_PARSED')
const rosterItemCommandParsed = createAction<RosterItemResult>('ROSTER_ITEM_COMMAND_PARSED')

function* handleParsedCommand({payload}: { type: string, payload: ParserResult<any> }) {
    console.log("handleParsedCommand", payload);
    if (payload.parser === FunctionName.THROTTLE) {
        yield put(throttleCommandParsed(payload));
    }
    if (payload.parser === FunctionName.ROSTER_ITEM) {
        yield put(rosterItemCommandParsed(payload));
    }
}

function* handleCommandReceived({payload}: { type: string, payload: string }) {
    console.log("handleCommandReceived", payload);
    const parser = genericParser()

    try {
        const result: ParserResult<any> = yield call(parser.parse, payload);
        yield put(commandParsedSuccess(result));
    } catch (e) {
        yield put(commandParsedFailed());
    }
}

function* commandSaga() {
    yield takeEvery(commandReceived.type, handleCommandReceived);
    yield takeEvery(commandParsedSuccess.type, handleParsedCommand)
}

export default commandSaga;