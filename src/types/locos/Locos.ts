import {BitValue} from "@cloudthrottle/dcc-ex--commands";
import {FunctionButtonKind} from "@cloudthrottle/dcc-ex--commands/lib/types/parsers/rosters/rosterItemParser";

export type LocosState = Locos

export type Loco = {
    id: string,
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
export type FunctionButtonsState = {
    [name: string]: {
        value: BitValue,
        display: string
    }
}

interface FunctionButton {
    display: string;
    kind: FunctionButtonKind;
}

export type FunctionButtons = FunctionButton[];

export type CreateLocoParams = {
    name: string,
    cabId: number,
    buttons: FunctionButtons
}
