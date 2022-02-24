import {createAction} from "@reduxjs/toolkit";

export const userResetState = createAction('USER_RESET_STATE')
export const userClearLocalStorage = createAction('USER_CLEAR_LOCAL_STORAGE')
export const userResetAndClearData = createAction('USER_RESET_AND_CLEAR_DATA')

export const userImportsSettings = createAction<string>('USER_IMPORTS_SETTINGS')
export const importLocos = createAction<{ locos: WebThrottleLocos }>('IMPORT_LOCOS')

export type WebThrottleLoco = {
    name: string
    cv: string
    type: string
    brand: string
    decoder: string
    map: string
}

export type WebThrottleLocos = WebThrottleLoco[]
export type WebThrottleMaps = any[]

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