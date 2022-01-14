import {BitValue} from "@cloudthrottle/dcc-ex--commands";

export type LocosState = Locos

export type Loco = {
    name: string,
    cabId: number
    throttle: ThrottleState
    functionButtons: FunctionButtonsState
}

export type Locos = Loco[]

export type ThrottleState = {
    speed: number,
    direction: number
};

export type FunctionButtonState = {
    name: number
    value: BitValue
    display: string
}
export type FunctionButtonsState = FunctionButtonState[]
