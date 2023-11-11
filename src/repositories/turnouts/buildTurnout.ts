import {AddTurnoutParams, Turnout, TurnoutPosition} from "../../types";

export type BuildTurnoutParams = AddTurnoutParams
type BuildTurnout = (params: BuildTurnoutParams) => Turnout

type MergeTurnoutParams = {
    turnout: AddTurnoutParams,
    existingTurnout: Turnout
}
type MergeTurnout = (params: MergeTurnoutParams) => Turnout
export const mergeTurnout: MergeTurnout = ({existingTurnout, turnout}): Turnout => {
    return {
        ...existingTurnout,
        ...turnout
    }
}

export const buildTurnout: BuildTurnout = (params) => {
    const defaultParams: Turnout = {
        id: 1,
        address: 1,
        position: TurnoutPosition.CLOSED
    }

    return mergeTurnout({
        existingTurnout: defaultParams,
        turnout: params
    })
}