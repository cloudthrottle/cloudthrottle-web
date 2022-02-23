import {createAction} from "@reduxjs/toolkit";
import {AddLocoParams} from "../../../types";

export const rosterItemUpdated = createAction<AddLocoParams>('ROSTER_ITEM_UPDATED')
export const newLocoFormSubmit = createAction<AddLocoParams>('NEW_LOCO_FORM_SUBMIT')
export const addOrUpdateLoco = createAction<AddLocoParams>('ADD_OR_UPDATE_LOCO')

export const userPopulateRoster = createAction('USER_POPULATE_ROSTER')
export const createRosterCommand = createAction('CREATE_ROSTER_COMMAND')
