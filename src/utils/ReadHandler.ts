import {Dispatch} from "@reduxjs/toolkit";
import {ReadHandler} from "@cloudthrottle/dcc-ex--serial-communicator";
import {LogItem} from "../types";
import {genericParser} from "@cloudthrottle/dcc-ex--commands";
import {handleParsedResult} from "./HandleParsedCommandResult";
import {addLog} from "../states";

export const readHandler = (dispatch: Dispatch<any>) => {
    const handleRead: ReadHandler = async (value) => {
        console.debug("READ: ", value)
        const log: LogItem = {
            message: value,
            kind: "received"
        }

        const parser = genericParser()
        try {
            const result = await parser.parse(value)
            handleParsedResult(result, dispatch);
        } catch {

        } finally {
            dispatch(addLog(log))
        }
    }
    return handleRead;
};