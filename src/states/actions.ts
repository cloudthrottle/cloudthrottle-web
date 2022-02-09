import {
    FunctionName,
    genericParser,
    ParserResult,
    RosterItemResult,
    throttleCommand
} from "@cloudthrottle/dcc-ex--commands";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {AddLocoParams, Loco, ThrottleState, Writer} from "../types";
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
import {
    createThrottleCommand,
    updateThrottleState,
    userChangedDirection,
    userChangedSpeed,
    userUpdateThrottleState
} from "./actions/throttles";

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

function* handleUserChangedSpeed({payload}: { type: string, payload: { loco: Loco, speed: number } }) {
    console.debug("handleUserChangedSpeed", payload);
    yield put(userUpdateThrottleState({
        loco: payload.loco,
        throttle: {
            speed: payload.speed
        }
    }))
}

function* handleUserChangedDirection({payload}: { type: string, payload: { loco: Loco, direction: number } }) {
    console.debug("handleUserChangedDirection", payload);
    yield put(userUpdateThrottleState({
        loco: payload.loco,
        throttle: {
            direction: payload.direction
        }
    }))
}

function* handleUserUpdateThrottleState({payload}: { type: string, payload: { loco: Loco, throttle: Partial<ThrottleState> } }) {
    console.debug("handleUserUpdateThrottleState", payload);
    yield put(updateThrottleState(payload))
    yield put(createThrottleCommand({
        loco: payload.loco,
        throttle: payload.throttle
    }))
}

function* handleCreateThrottleCommand({payload}: { type: string, payload: { loco: Loco, throttle: Partial<ThrottleState> } }) {
    console.debug("handleCreateThrottleCommand", payload);
    const {loco, throttle} = payload
    const newThrottle = {
        ...loco.throttle,
        ...throttle
    }

    const command = throttleCommand({
        ...newThrottle,
        cab: loco.cabId,
    })
    yield put(commandSend(command))
}

function* commandSaga() {
    yield takeEvery(commandReceived.type, handleCommandReceived);
    yield takeEvery(commandParsedSuccess.type, handleParsedCommand)
    yield takeEvery(commandSend.type, handleCommandSend)
    yield takeLatest(setCommunicationsWriter.type, handleSetCommunicationsWriter)
    yield takeEvery(rosterItemCommandParsed.type, handleRosterItemCommandParsed)
    yield takeEvery(rosterItemUpdated.type, handleAddedOrUpdatedLoco)
    yield takeEvery(newLocoFormSubmit.type, handleAddedOrUpdatedLoco)
    yield takeEvery(userChangedSpeed.type, handleUserChangedSpeed)
    yield takeEvery(userChangedDirection.type, handleUserChangedDirection)
    yield takeEvery(userUpdateThrottleState.type, handleUserUpdateThrottleState)
    yield takeEvery(createThrottleCommand.type, handleCreateThrottleCommand)
}

export default commandSaga;