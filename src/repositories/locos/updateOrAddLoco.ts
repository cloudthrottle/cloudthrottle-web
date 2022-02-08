import {Loco, LocosState} from "../../types";
import {Draft} from "@reduxjs/toolkit";

type FindOrAddLocoParams = {
    loco: Loco,
    state: Draft<LocosState>
}
type FindOrAddLoco = (params: FindOrAddLocoParams) => Draft<LocosState>

type UpdateRosterLocoParams = {
    loco: Loco;
    state: Draft<LocosState>;
}
type UpdateRosterLoco = (params: UpdateRosterLocoParams) => Draft<LocosState>
const updateRosterLoco: UpdateRosterLoco = ({loco, state}) => {
    const existingLoco = state.entities[loco.cabId]
    if (existingLoco.sync.rosterListAt) {
        loco.sync.rosterItemAt = Date.now()
    } else {
        loco.sync.rosterListAt = Date.now()
    }

    state.entities[loco.cabId] = {
        ...existingLoco,
        ...loco
    }
    return state
};


export const updateOrAddRosterLoco: FindOrAddLoco = ({loco, state}) => {
    if (Object.keys(state.entities).includes(loco.cabId.toString())) {
        return updateRosterLoco({loco, state});

    }

    return addLoco({state, loco});
}

type AddLocoParams = { state: Draft<LocosState>, loco: Loco };
type AddLoco = (params: AddLocoParams) => Draft<LocosState>
const addLoco: AddLoco = ({state, loco}) => {
    state.entities[loco.cabId] = loco
    return state
};

export const updateOrAddLoco: FindOrAddLoco = ({loco, state}) => {
    if (Object.keys(state.entities).includes(loco.cabId.toString())) {
        return updateLoco({loco, state})
    }

    return addLoco({state: state, loco: loco});
}

export const updateLoco: FindOrAddLoco = ({loco, state}) => {
    const existingLoco = state.entities[loco.cabId]
    state.entities[loco.cabId] = {
        ...existingLoco,
        ...loco
    }
    return state
}