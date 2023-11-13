import {TurnoutState} from "@cloudthrottle/dcc-ex--commands";

export enum TurnoutPosition {
    CLOSED = TurnoutState.CLOSED,
    THROWN = TurnoutState.THROWN
}

export type Turnout = {
    id: number,
    position: TurnoutPosition
    address: number
}

export type Turnouts = {
    [id: number]: Turnout
}

export type TurnoutsState = {
    entities: Turnouts
}

export type AddTurnoutParams = Pick<Turnout, 'id' | 'address'>
export type UpdateTurnoutParams = {
    id: number,
    position?: TurnoutPosition
    address?: number
}
export type AddOrUpdateTurnoutParams = AddTurnoutParams | UpdateTurnoutParams