import {
    BitValue,
    cabCommand,
    emergencyStopCommand,
    FunctionName,
    genericParser,
    ParserResult,
    powerCommand,
    rosterCommand,
    RosterItemResult,
    throttleCommand
} from "@cloudthrottle/dcc-ex--commands";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {AddLocoParams, Loco, Locos, PartialFunctionButtons, ThrottleState, Writer} from "../types";
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
import {
    addOrUpdateLoco,
    createRosterCommand,
    newLocoFormSubmit,
    rosterItemUpdated,
    userPopulateRoster
} from "./actions/locos";
import {
    createCabCommand,
    createEmergencyStopCommand,
    createThrottleCommand,
    updateFunctionButtonState,
    updateThrottleState,
    userChangedButtonValue,
    userChangedDirection,
    userChangedSpeed,
    userEmergencyStop,
    userEmergencyStopLoco,
    userStopLoco,
    userUpdateFunctionButtonState,
    userUpdateThrottleState
} from "./actions/throttles";
import {createPowerCommand, updatePowerState, userChangedPower} from "./actions/powers";
import {
    importLocos,
    userClearLocalStorage,
    userImportsSettings,
    userResetAndClearData,
    userResetState,
    WebThrottleLocos,
    WebThrottleSettings
} from "./actions/stores";

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

function* handleUserChangedFunctionButtonValue({payload}: { type: string, payload: { loco: Loco, name: number, value: BitValue } }) {
    console.debug("handleUserChangedFunctionButtonValue", payload);
    const functionButtons: PartialFunctionButtons = {
        [payload.name]: {
            value: payload.value
        }
    }

    yield put(userUpdateFunctionButtonState({
        loco: payload.loco,
        functionButtons
    }))
}

function* handleUserUpdateFunctionButtonValue({payload}: { type: string, payload: { loco: Loco, functionButtons: PartialFunctionButtons } }) {
    console.debug("handleUserUpdateFunctionButtonValue", payload);

    yield put(updateFunctionButtonState({
        loco: payload.loco,
        functionButtons: payload.functionButtons
    }))
    yield put(createCabCommand({
        loco: payload.loco,
        functionButtons: payload.functionButtons
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

function* handleEmergencyStopLoco({payload}: { type: string, payload: { loco: Loco } }) {
    console.debug("handleEmergencyStopLoco", payload);
    yield put(userChangedSpeed({
        loco: payload.loco,
        speed: -1
    }))
}

function* handleUserEmergencyStop({payload}: { type: string, payload: { locos: Locos } }) {
    console.debug("handleUserEmergencyStop", payload);

    for (const loco of Object.values(payload.locos)) {
        yield put(updateThrottleState({
            loco,
            throttle: {
                ...loco.throttle,
                speed: -1
            }
        }))
    }


    yield put(createEmergencyStopCommand())
}

function* handleUserChangedPower({payload}: { type: string, payload: BitValue }) {
    console.debug("handleUserChangedPower", payload);

    yield put(updatePowerState(payload))
    yield put(createPowerCommand(payload))
}

function* handleStopLoco({payload}: { type: string, payload: { loco: Loco } }) {
    console.debug("handleStopLoco", payload);
    yield put(userChangedSpeed({
        loco: payload.loco,
        speed: 0
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

function* handleCreatePowerCommand({payload}: { type: string, payload: BitValue }) {
    console.debug("handleCreatePowerCommand", payload);

    const command = powerCommand({
        power: payload
    })
    yield put(commandSend(command))
}

function* handleCreateCabCommand({payload}: { type: string, payload: { loco: Loco, functionButtons: PartialFunctionButtons } }) {
    console.debug("handleCreateCabCommand", payload);
    const {loco, functionButtons} = payload

    const commands = Object.entries(functionButtons).map(([name, button]) => {
        const command = cabCommand({
            cab: loco.cabId,
            func: parseInt(name),
            value: button.value
        })

        return put(commandSend(command))
    })

    yield* commands
}

function* handleCreateEmergencyStopCommand() {
    console.debug("handleCreateEmergencyStopCommand");

    const command = emergencyStopCommand()
    yield put(commandSend(command))
}

function* handlePopulateRoster() {
    console.debug("handlePopulateRoster");
    yield put(createRosterCommand())
}

function* handleCreateRosterCommand() {
    console.debug("handleCreateRosterCommand");

    const command = rosterCommand()
    yield put(commandSend(command))
}

function* handleUserResetAndClearData() {
    console.debug("handleUserResetAndClearData");
    yield* [put(userResetState()), put(userClearLocalStorage())]
}

function* handleUserImportsSettings({payload}: { type: string, payload: string }) {
    console.debug("handleUserImportsSettings", payload);
    const settings: WebThrottleSettings = JSON.parse(payload)
    const [{maps}, {locos}, {preferences}] = settings
    yield put(importLocos({locos}))
}

type HandleImportLocosParams = { type: string, payload: { locos: WebThrottleLocos } };

function* handleImportLocos({payload}: HandleImportLocosParams) {
    console.debug("handleImportLocos", payload)
    const {locos} = payload
    const actions = locos.map(loco => {
        const {name, cv} = loco
        const param: AddLocoParams = {
            name,
            cabId: parseInt(cv),
        }
        return put(addOrUpdateLoco(param))
    })

    yield* actions
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
    yield takeEvery(userStopLoco.type, handleStopLoco)
    yield takeEvery(userEmergencyStopLoco.type, handleEmergencyStopLoco)
    yield takeEvery(userUpdateThrottleState.type, handleUserUpdateThrottleState)
    yield takeEvery(createThrottleCommand.type, handleCreateThrottleCommand)
    yield takeEvery(createCabCommand.type, handleCreateCabCommand)
    yield takeEvery(createEmergencyStopCommand.type, handleCreateEmergencyStopCommand)
    yield takeEvery(userEmergencyStop.type, handleUserEmergencyStop)
    yield takeEvery(userChangedButtonValue.type, handleUserChangedFunctionButtonValue)
    yield takeEvery(userUpdateFunctionButtonState.type, handleUserUpdateFunctionButtonValue)
    yield takeEvery(userChangedPower.type, handleUserChangedPower)
    yield takeEvery(createPowerCommand.type, handleCreatePowerCommand)
    yield takeEvery(userPopulateRoster.type, handlePopulateRoster)
    yield takeEvery(createRosterCommand.type, handleCreateRosterCommand)
    yield takeEvery(userResetAndClearData.type, handleUserResetAndClearData)
    yield takeEvery(userImportsSettings.type, handleUserImportsSettings)
    yield takeEvery(importLocos.type, handleImportLocos)
}

export default commandSaga;
