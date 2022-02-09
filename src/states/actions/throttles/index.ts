import {createAction} from "@reduxjs/toolkit";
import {Loco, Locos, ThrottleState} from "../../../types";

export const userChangedSpeed = createAction<{ loco: Loco, speed: number }>('USER_CHANGED_SPEED')
export const userChangedDirection = createAction<{ loco: Loco, direction: number }>('USER_CHANGED_DIRECTION')
export const userStopLoco = createAction<{ loco: Loco }>('USER_STOP_LOCO')
export const userEmergencyStopLoco = createAction<{ loco: Loco }>('USER_EMERGENCY_STOP_LOCO')
export const userEmergencyStop = createAction<{ locos: Locos }>('USER_EMERGENCY_STOP')

export const userUpdateThrottleState = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('USER_UPDATE_THROTTLE_STATE')
export const updateThrottleState = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('UPDATE_THROTTLE_STATE')
export const createThrottleCommand = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('CREATE_THROTTLE_COMMAND')
export const createEmergencyStopCommand = createAction('CREATE_EMERGENCY_STOP_COMMAND')

