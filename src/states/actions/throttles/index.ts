import {createAction} from "@reduxjs/toolkit";
import {Loco, ThrottleState} from "../../../types";

export const userChangedSpeed = createAction<{ loco: Loco, speed: number }>('USER_CHANGED_SPEED')
export const userChangedDirection = createAction<{ loco: Loco, direction: number }>('USER_CHANGED_DIRECTION')
export const userUpdateThrottleState = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('USER_UPDATE_THROTTLE_STATE')
export const updateThrottleState = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('UPDATE_THROTTLE_STATE')
export const createThrottleCommand = createAction<{ loco: Loco, throttle: Partial<ThrottleState> }>('CREATE_THROTTLE_COMMAND')

