import {FunctionButton, FunctionButtons} from "@cloudthrottle/dcc-ex--commands";

export type LocosState = Locos

export type Loco = {
  id: string,
  name: string,
  cabId: number
  throttle: ThrottleState
  functionButtons: FunctionButtons
}

export type Locos = Loco[]

export type ThrottleState = {
  speed: number,
  direction: number
};

export type PartialFunctionButtons = FunctionButtons<Partial<FunctionButton>>;

export type CreateLocoParams = {
  name: string,
  cabId: number,
  buttons: PartialFunctionButtons
}
