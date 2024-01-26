import {
    BitValue,
    defineDCCTurnoutCommand,
    turnoutCommand,
    TurnoutDCCResult,
    TurnoutItemResult,
    TurnoutListResult,
    TurnoutResult,
    turnoutsCommand
} from "@cloudthrottle/dcc-ex--commands";
import {put} from "redux-saga/effects";
import {commandSend} from "../commands";
import {AddOrUpdateTurnoutParams, AddTurnoutParams, Turnout} from "../../../types";
import {
    addOrUpdateTurnout,
    createDefineTurnoutCommand,
    createTurnoutItemCommand,
    updateTurnoutPosition,
    userPopulateTurnoutItem
} from "./turnout_actions";

export function* handleNewTurnoutFormSubmit({payload}: { type: string, payload: AddTurnoutParams }) {
    console.debug("handleNewTurnoutFormSubmit", payload);
    yield put(createDefineTurnoutCommand(payload))
    yield put(addOrUpdateTurnout(payload))
}

export function* handleCreateDefineTurnoutCommand({payload}: { type: string, payload: AddTurnoutParams }) {
    console.debug("handleCreateDefineTurnoutCommand", payload);

    const command = defineDCCTurnoutCommand({
        turnout: payload.id,
        address: payload.address
    })
    yield put(commandSend(command))
}

export function* handlePopulateTurnouts() {
    console.debug("handlePopulateTurnouts");

    const command = turnoutsCommand()
    yield put(commandSend(command))
}

export function* handleUserChangedTurnoutPosition({payload}: {
    type: string,
    payload: { turnout: Turnout, position: number }
}) {
    console.debug("handleUserChangedTurnoutPosition");
    yield put(updateTurnoutPosition(payload))
    const command = turnoutCommand({
        turnout: payload.turnout.id,
        thrown: payload.position
    })
    yield put(commandSend(command))
}

export function* handleTurnoutCommandParsed({payload}: { type: string, payload: TurnoutResult | TurnoutDCCResult }) {
    console.debug("handleTurnoutCommandParsed");

    const {params: {id, thrown}} = payload
    const params: AddOrUpdateTurnoutParams = {
        id,
        position: thrown as BitValue
    }
    yield put(addOrUpdateTurnout(params))
}


export function* handleTurnoutListCommandParsed({payload}: { type: string, payload: TurnoutListResult }) {
    console.debug("handleTurnoutListCommandParsed");
    const {params: {turnoutIds}} = payload

    for (const turnoutId of turnoutIds) {
        yield put(userPopulateTurnoutItem(turnoutId))
    }

}

export function* handleTurnoutItemCommandParsed({payload}: { type: string, payload: TurnoutItemResult }) {
    console.debug("handleTurnoutItemCommandParsed");

    const {params: {turnoutId, thrown}} = payload
    const turnout: AddOrUpdateTurnoutParams = {
        id: turnoutId,
        position: thrown as BitValue
    }
    yield put(addOrUpdateTurnout(turnout))
}

export function* handlePopulateTurnoutItem({payload}: { type: string, payload: number }) {
    console.debug("handlePopulateTurnoutItem");
    yield put(createTurnoutItemCommand(payload))
}


export function* handleCreateTurnoutItemCommand({payload}: { type: string, payload: number }) {
    console.debug("handleCreateTurnoutItemCommand");

    const command = turnoutsCommand({turnoutId: payload})
    yield put(commandSend(command))
}
