import {createAction} from "@reduxjs/toolkit";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";

export const userChangedPower = createAction<BitValue>('USER_CHANGED_POWER')
export const updatePowerState = createAction<BitValue>('UPDATE_POWER_STATE')
export const createPowerCommand = createAction<BitValue>('CREATE_POWER_COMMAND')
