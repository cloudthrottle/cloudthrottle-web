export enum TurnoutPosition {
    CLOSED = 0,
    THROWN = 1
}

export type Turnout = {
    id: number,
    address: number
    position: TurnoutPosition
}

export type Turnouts = {
    [id: number]: Turnout
}

export type TurnoutsState = {
    entities: Turnouts
}

export type AddTurnoutParams = Pick<Turnout, 'id' | 'address'>