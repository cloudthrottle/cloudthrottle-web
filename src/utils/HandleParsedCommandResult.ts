import {FunctionName, ParserResult, RosterItemResult} from "@cloudthrottle/dcc-ex--commands";
import {Dispatch} from "@reduxjs/toolkit";
import {addLoco} from "../states";

export function handleParsedResult(result: ParserResult<any>, dispatch: Dispatch<any>) {
    if (result.parser === FunctionName.ROSTER_ITEM) {
        const {params: {display, cabId}} = result as RosterItemResult
        dispatch(addLoco({name: display, cabId}))
    }
}