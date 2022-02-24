import {createAction} from "@reduxjs/toolkit";

export const userResetState = createAction('USER_RESET_STATE')
export const userClearLocalStorage = createAction('USER_CLEAR_LOCAL_STORAGE')
export const userResetAndClearData = createAction('USER_RESET_AND_CLEAR_DATA')
