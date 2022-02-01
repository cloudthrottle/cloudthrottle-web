import {Loco, LocosState} from "../../types";
import {Draft} from "@reduxjs/toolkit";

type FindOrAddLocoParams = {
    loco: Loco,
    state: Draft<LocosState>
}
type FindOrAddLoco = (params: FindOrAddLocoParams) => Draft<LocosState>
export const findOrAddLoco: FindOrAddLoco = ({loco, state}) => {
    const foundLoco = state.find(existingLoco => existingLoco.cabId === loco.cabId)
    if (foundLoco) {
        return state
    }

    state.push(loco)
    return state
}