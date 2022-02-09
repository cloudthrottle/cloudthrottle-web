import {Dispatch} from "@reduxjs/toolkit";
import {ReadHandler} from "@cloudthrottle/dcc-ex--serial-communicator";
import {LogItem} from "../types";
import {genericParser} from "@cloudthrottle/dcc-ex--commands";
import {handleParsedResult} from "./HandleParsedCommandResult";
import {addLog} from "../states";
import {commandReceived} from "../states/actions";

export const readHandler = (dispatch: Dispatch<any>) => {
    const handleRead: ReadHandler = async (value) => {
        console.debug("READ: ", value)
        dispatch(commandReceived(value))
    }
    return handleRead;
};