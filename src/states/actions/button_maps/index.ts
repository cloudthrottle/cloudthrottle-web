import {createAction} from "@reduxjs/toolkit";
import {FunctionButtonMap} from "../../../types";
import {WebThrottleMaps} from "../stores";

export type ImportMapsActionPayload = WebThrottleMaps
export const importMaps = createAction<ImportMapsActionPayload>('IMPORT_MAPS')
export const addOrUpdateMap = createAction<FunctionButtonMap>('ADD_OR_UPDATE_MAP')
