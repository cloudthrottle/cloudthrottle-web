import {BitValue, FunctionName, ParserResult, PowerResult, RosterItemResult} from "@cloudthrottle/dcc-ex--commands";
import {Dispatch} from "@reduxjs/toolkit";
import {addRosterLoco, setAllPower} from "../states";

export function handleParsedResult(result: ParserResult<any>, dispatch: Dispatch<any>) {
    if (result.parser === FunctionName.ROSTER_ITEM) {
        const {params: {display, cabId, functionButtons: buttons}} = result as RosterItemResult
        dispatch(addRosterLoco({name: display, cabId, buttons}))
    }
    if (result.parser === FunctionName.POWER) {
        const {params: {power}} = result as PowerResult
        dispatch(setAllPower(power as BitValue))
    }
}