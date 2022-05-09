import {
    BitValue,
    cabCommand,
    DecoderAddressResult,
    emergencyStopCommand,
    FunctionName,
    genericParser,
    ParserResult,
    powerCommand,
    PowerResult,
    readAddressProgrammingCommand,
    rosterCommand,
    RosterItemResult,
    throttleCommand
} from "@cloudthrottle/dcc-ex--commands";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    AddLocoParams,
    FunctionButtonMap,
    FunctionButtonMaps,
    Loco,
    Locos,
    PartialFunctionButtons,
    ThrottleState,
    Writer
} from "../types";
import {
    addCommandToLog,
    commandParsedFailed,
    commandParsedSuccess,
    commandReceived,
    commandSend,
    commandWrite,
    powerCommandParsed,
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
    ImportLocosActionPayload,
    userClearLocalStorage,
    userImportsSettings,
    userResetAndClearData,
    userResetState,
    WebThrottleSettings
} from "./actions/stores";
import {convertWebThrottleMapToFunctionButtons} from "../repositories/locos";
import {addOrUpdateMap, importMaps, ImportMapsActionPayload} from "./actions/button_maps";
import {
    createDecoderReadAddressCommand,
    decoderReadAddressCommandParsed,
    updateLastReadAddressState,
    userDecoderReadAddress
} from "./actions/decoders";

function* handleParsedCommand({payload}: { type: string, payload: ParserResult<any> }) {
    console.debug("handleParsedCommand", payload);
    const {parser} = payload

    switch (parser) {
        case FunctionName.THROTTLE:
            yield put(throttleCommandParsed(payload));
            break;
        case FunctionName.ROSTER_ITEM:
            yield put(rosterItemCommandParsed(payload));
            break;
        case FunctionName.POWER:
            yield put(powerCommandParsed(payload))
            break;
        case FunctionName.DECODER_ADDRESS:
            yield put(decoderReadAddressCommandParsed(payload))
            break;
    }
}

function* handleCommandReceived({payload}: { type: string, payload: string }) {
    console.debug("handleCommandReceived", payload);
    console.debug("READ: ", payload)
    yield put(addCommandToLog({message: payload, kind: "received"}))
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
    yield put(addCommandToLog({message: payload, kind: "sent"}))
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

function* handlePowerCommandParsed({payload}: { type: string, payload: PowerResult }) {
    console.debug("handlePowerCommandParsed", payload);
    const {params: {power}} = payload
    yield put(updatePowerState(power as BitValue))
}

function* handleDecoderReadAddressCommandParsed({payload}: { type: string, payload: DecoderAddressResult }) {
    console.log("handleDecoderReadAddressCommandParsed", payload);
    const {params: {address}} = payload
    yield put(updateLastReadAddressState(address))
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

function* handleUserDecoderReadAddress() {
    console.debug("handleUserDecoderReadAddress");

    yield put(createDecoderReadAddressCommand())
}

function* handleCreateDecoderReadAddressCommand() {
    console.debug("handleCreateDecoderReadAddressCommand");

    const command = readAddressProgrammingCommand()
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
    const [{maps}, {locos}] = settings
    yield put(importMaps(maps))
    yield put(importLocos({locos, maps}))
}

type HandleImportLocosParams = { type: string, payload: ImportLocosActionPayload };

function* handleImportLocos({payload}: HandleImportLocosParams) {
    console.debug("handleImportLocos", payload)
    const {locos, maps} = payload
    if (locos === null) {
        return
    }

    const actions = locos.map(loco => {
        const {name, cv, map: mapName} = loco
        const map = maps.find(possibleMap => possibleMap.mname === mapName)
        const param: AddLocoParams = {
            name,
            cabId: parseInt(cv),
            functionButtons: convertWebThrottleMapToFunctionButtons(map)
        }
        return put(addOrUpdateLoco(param))
    })

    yield* actions
}

type HandleImportMapsParams = { type: string, payload: ImportMapsActionPayload };

function* handleImportMaps({payload}: HandleImportMapsParams) {
    console.debug("handleImportMaps", payload)
    const buttonMaps: FunctionButtonMaps = payload.map(webThrottleMap => {
        const buttonMap: FunctionButtonMap = {
            display: webThrottleMap.mname,
            functionButtons: convertWebThrottleMapToFunctionButtons(webThrottleMap)
        }
        return buttonMap
    })
    yield* buttonMaps.map(buttonMap => put(addOrUpdateMap(buttonMap)))
}


function* commandSaga() {
    yield takeEvery(commandReceived.type, handleCommandReceived);
    yield takeEvery(commandParsedSuccess.type, handleParsedCommand)
    yield takeEvery(commandSend.type, handleCommandSend)
    yield takeLatest(setCommunicationsWriter.type, handleSetCommunicationsWriter)
    yield takeEvery(rosterItemCommandParsed.type, handleRosterItemCommandParsed)
    yield takeEvery(powerCommandParsed.type, handlePowerCommandParsed)
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
    yield takeEvery(importMaps.type, handleImportMaps)
    yield takeEvery(importLocos.type, handleImportLocos)
    yield takeEvery(userDecoderReadAddress.type, handleUserDecoderReadAddress)
    yield takeEvery(createDecoderReadAddressCommand.type, handleCreateDecoderReadAddressCommand)
    yield takeEvery(decoderReadAddressCommandParsed.type, handleDecoderReadAddressCommandParsed)
}

export default commandSaga;
