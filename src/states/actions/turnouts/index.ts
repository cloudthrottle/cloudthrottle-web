import {createAction} from "@reduxjs/toolkit";
import {AddTurnoutParams} from "../../../types";

// export const rosterItemUpdated = createAction<AddLocoParams>('ROSTER_ITEM_UPDATED')
export const newTurnoutFormSubmit = createAction<AddTurnoutParams>('NEW_TURNOUT_FORM_SUBMIT')
export const addOrUpdateTurnout = createAction<AddTurnoutParams>('ADD_OR_UPDATE_TURNOUT')

export const userPopulateTurnouts = createAction('USER_POPULATE_TURNOUTS')
export const createDefineTurnoutCommand = createAction<AddTurnoutParams>('CREATE_DEFINE_TURNOUT_COMMAND')
