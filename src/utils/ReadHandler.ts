import {Dispatch} from "@reduxjs/toolkit";
import {ReadHandler} from "@cloudthrottle/dcc-ex--serial-communicator";
import {commandReceived} from "../states/actions/commands";

export const readHandler = (dispatch: Dispatch<any>) => {
    const handleRead: ReadHandler = async (value) => {
        console.debug("READ: ", value)
        dispatch(commandReceived(value))
    }
    return handleRead;
};