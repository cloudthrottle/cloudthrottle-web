import {BitValue, FunctionName, ParserResult, PowerResult, RosterItemResult} from "@cloudthrottle/dcc-ex--commands";
import {Dispatch} from "@reduxjs/toolkit";
import {addLoco, setAllPower} from "../states";

export function handleParsedResult(result: ParserResult<any>, dispatch: Dispatch<any>) {
    if (result.parser === FunctionName.ROSTER_ITEM) {
        const {params: {display, cabId}} = result as RosterItemResult
        dispatch(addLoco({name: display, cabId}))
    }
    if (result.parser === FunctionName.POWER) {
        const {params: {power}} = result as PowerResult
        dispatch(setAllPower(power as BitValue))
    }
}