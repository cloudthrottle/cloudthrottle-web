import {put} from "redux-saga/effects";
import {rosterCommand, RosterItemResult, RosterListResult} from "@cloudthrottle/dcc-ex--commands";
import {createRosterCommand, createRosterItemCommand, rosterItemUpdated, userPopulateRosterItem} from "./loco_actions";
import {commandSend} from "../commands";
import {AddLocoParams} from "../../../types";

export function* handlePopulateRoster() {
    console.debug("handlePopulateRoster");
    yield put(createRosterCommand())
}

export function* handlePopulateRosterItem({payload}: { type: string, payload: number }) {
    console.debug("handlePopulateRosterItem");
    yield put(createRosterItemCommand(payload))
}

export function* handleCreateRosterCommand() {
    console.debug("handleCreateRosterCommand");

    const command = rosterCommand()
    yield put(commandSend(command))
}

export function* handleCreateRosterItemCommand({payload}: { type: string, payload: number }) {
    console.debug("handleCreateRosterItemCommand");

    const command = rosterCommand({cabId: payload})
    yield put(commandSend(command))
}

export function* handleRosterListCommandParsed({payload}: { type: string, payload: RosterListResult }) {
    console.debug("handleRosterListCommandParsed", payload);
    const {params: {cabIds}} = payload

    for (const cabId of cabIds) {
        yield put(userPopulateRosterItem(cabId))
    }
}

export function* handleRosterItemCommandParsed({payload}: { type: string, payload: RosterItemResult }) {
    console.debug("handleRosterItemCommandParsed", payload);
    const {params: {cabId, display, functionButtons}} = payload
    const loco: AddLocoParams = {
        cabId,
        name: display,
        functionButtons
    }
    yield put(rosterItemUpdated(loco))
}
