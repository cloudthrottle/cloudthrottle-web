import {createAction} from "@reduxjs/toolkit";
import {AddLocoParams} from "../../../types";

export const rosterItemUpdated = createAction<AddLocoParams>('ROSTER_ITEM_UPDATED')
export const newLocoFormSubmit = createAction<AddLocoParams>('NEW_LOCO_FORM_SUBMIT')
export const addOrUpdateLoco = createAction<AddLocoParams>('ADD_OR_UPDATE_LOCO')

export const userPopulateRoster = createAction('USER_POPULATE_ROSTER')
export const userPopulateRosterItem = createAction<number>('USER_POPULATE_ROSTER_ITEM')
export const createRosterCommand = createAction('CREATE_ROSTER_COMMAND')
export const createRosterItemCommand = createAction<number>('CREATE_ROSTER_ITEM_COMMAND')
