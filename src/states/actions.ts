import {FunctionName, genericParser, ParserResult, RosterItemResult} from "@cloudthrottle/dcc-ex--commands";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {AddLocoParams, Writer} from "../types";
import {
    commandParsedFailed,
    commandParsedSuccess,
    commandReceived,
    commandSend,
    commandWrite,
    rosterItemCommandParsed,
    throttleCommandParsed
} from "./actions/commands";
import {communicationsConnected, communicationsDisconnected, setCommunicationsWriter} from "./actions/communications";
import {addOrUpdateLoco, newLocoFormSubmit, rosterItemUpdated} from "./actions/locos";

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

function* handleRosterItemCommandParsed({payload}: { type: string, payload: RosterItemResult }) {
    console.debug("handleRosterItemCommandParsed", payload);
    const {params: {cabId, display, functionButtons}} = payload
    const loco: AddLocoParams = {
        cabId,
        name: display,
        functionButtons
    }
    yield put(rosterItemUpdated(loco))
}

function* handleAddedOrUpdatedLoco({payload}: { type: string, payload: AddLocoParams }) {
    console.debug("handleAddedOrUpdatedLoco", payload);
    yield put(addOrUpdateLoco(payload))
}

function* commandSaga() {
    yield takeEvery(commandReceived.type, handleCommandReceived);
    yield takeEvery(commandParsedSuccess.type, handleParsedCommand)
    yield takeEvery(commandSend.type, handleCommandSend)
    yield takeLatest(setCommunicationsWriter.type, handleSetCommunicationsWriter)
    yield takeEvery(rosterItemCommandParsed.type, handleRosterItemCommandParsed)
    yield takeEvery(rosterItemUpdated.type, handleAddedOrUpdatedLoco)
    yield takeEvery(newLocoFormSubmit.type, handleAddedOrUpdatedLoco)
}

export default commandSaga;