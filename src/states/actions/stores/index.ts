import {createAction} from "@reduxjs/toolkit";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";

export const userResetState = createAction('USER_RESET_STATE')
export const userClearLocalStorage = createAction('USER_CLEAR_LOCAL_STORAGE')
export const userResetAndClearData = createAction('USER_RESET_AND_CLEAR_DATA')

export const userImportsSettings = createAction<string>('USER_IMPORTS_SETTINGS')
export type ImportLocosActionPayload = { locos: WebThrottleLocos | null, maps: WebThrottleMaps };
export const importLocos = createAction<ImportLocosActionPayload>('IMPORT_LOCOS')

export type WebThrottleLoco = {
    name: string
    cv: string
    type: string
    brand: string
    decoder: string
    map: string
}

export type WebThrottleMap = {
    mname: string
    fnData: {
        [name: string]: [ // "f0"
            BitValue, // state
            BitValue, // type (0-Toggle, 1-press)
            string, // display
            BitValue // visible
        ]
    }
}

export type WebThrottleLocos = Array<WebThrottleLoco>
export type WebThrottleMaps = WebThrottleMap[]

export type WebThrottleSettings = [
    {
        maps: WebThrottleMaps
    },
    {
        locos: WebThrottleLocos
    },
    {
        preferences: {
            scontroller: string
            dbugConsole: boolean
            theme: string
        }
    }
]
