import {FunctionButton, FunctionButtons} from "@cloudthrottle/dcc-ex--commands";

export type LocosState = {
    entities: Locos
}

export type DateTime = number

export type LocoSync = {
    rosterListAt: DateTime | null;
    rosterItemAt: DateTime | null;
}

export type Loco = {
    id: string,
    name: string,
    cabId: number
    throttle: ThrottleState
    functionButtons: FunctionButtons,
    sync: LocoSync
}

export type Locos = {
    [cabId: number]: Loco
}

export type ThrottleState = {
    speed: number,
    direction: number
};

export type PartialFunctionButtons = FunctionButtons<Partial<FunctionButton>>;

export type AddLocoParams = {
    name: string,
    cabId: number,
    buttons: PartialFunctionButtons
}
