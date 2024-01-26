import {createAction} from "@reduxjs/toolkit";
import {AddOrUpdateTurnoutParams, AddTurnoutParams, Turnout, TurnoutPosition} from "../../../types";
import {TurnoutDCCResult, TurnoutResult} from "@cloudthrottle/dcc-ex--commands";

export const turnoutCommandParsed = createAction<TurnoutResult>('TURNOUT_COMMAND_PARSED')
export const turnoutDCCCommandParsed = createAction<TurnoutDCCResult>('TURNOUT_DCC_COMMAND_PARSED')
export const newTurnoutFormSubmit = createAction<AddTurnoutParams>('NEW_TURNOUT_FORM_SUBMIT')
export const addOrUpdateTurnout = createAction<AddOrUpdateTurnoutParams>('ADD_OR_UPDATE_TURNOUT')

export const userPopulateTurnouts = createAction('USER_POPULATE_TURNOUTS')
export const createDefineTurnoutCommand = createAction<AddTurnoutParams>('CREATE_DEFINE_TURNOUT_COMMAND')

export const userChangedTurnoutPosition = createAction<{
    turnout: Turnout,
    position: TurnoutPosition
}>('USER_CHANGED_TURNOUT_POSITION')
export const updateTurnoutPosition = createAction<{
    turnout: Turnout,
    position: TurnoutPosition
}>('UPDATE_TURNOUT_POSITION')

export const userPopulateTurnoutItem = createAction<number>('USER_POPULATE_TURNOUT_ITEM')

export const createTurnoutItemCommand = createAction<number>('CREATE_TURNOUT_ITEM_COMMAND')
