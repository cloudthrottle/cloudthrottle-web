import {createAction} from "@reduxjs/toolkit";
import {Writer} from "../../../types";

export const setCommunicationsWriter = createAction<Writer>('SET_COMMUNICATIONS_WRITER')
export const communicationsConnected = createAction('COMMUNICATIONS_CONNECTED')
export const communicationsDisconnected = createAction('COMMUNICATIONS_DISCONNECTED')
export const userClearCommunicationLogs = createAction('USER_CLEAR_COMMUNICATION_LOGS')
