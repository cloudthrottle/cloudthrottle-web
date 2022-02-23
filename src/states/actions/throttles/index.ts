import {createAction} from "@reduxjs/toolkit";
import {Loco, Locos, PartialFunctionButtons, ThrottleState} from "../../../types";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";

export const userChangedSpeed = createAction<{ loco: Loco, speed: number }>('USER_CHANGED_SPEED')
export const userChangedDirection = createAction<{ loco: Loco, direction: number }>('USER_CHANGED_DIRECTION')
export const userStopLoco = createAction<{ loco: Loco }>('USER_STOP_LOCO')
export const userEmergencyStopLoco = createAction<{ loco: Loco }>('USER_EMERGENCY_STOP_LOCO')
export const userEmergencyStop = createAction<{ locos: Locos }>('USER_EMERGENCY_STOP')
export const userChangedButtonValue = createAction<{ loco: Loco, name: number, value: BitValue }>('USER_CHANGED_BUTTON_VALUE')

export const userUpdateThrottleState = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('USER_UPDATE_THROTTLE_STATE')
export const updateThrottleState = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('UPDATE_THROTTLE_STATE')
export const userUpdateFunctionButtonState = createAction<{ loco: Loco, functionButtons: PartialFunctionButtons }>('USER_UPDATE_FUNCTION_BUTTON_STATE')
export const updateFunctionButtonState = createAction<{ loco: Loco, functionButtons: PartialFunctionButtons }>('UPDATE_FUNCTION_BUTTON_STATE')
export const createThrottleCommand = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('CREATE_THROTTLE_COMMAND')
export const createCabCommand = createAction<{ loco: Loco, functionButtons: PartialFunctionButtons }>('CREATE_CAB_COMMAND')
export const createEmergencyStopCommand = createAction('CREATE_EMERGENCY_STOP_COMMAND')

