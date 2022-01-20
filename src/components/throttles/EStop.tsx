import {useDispatch} from "react-redux";
import {sendLog, setEStopAll} from "../../states";
import React from "react";
import {emergencyStopCommand} from "@cloudthrottle/dcc-ex--commands";

export const EStop = () => {
    const dispatch = useDispatch()

    const handleEStopSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleEStopSubmit")
        event.preventDefault()

        const message = emergencyStopCommand()

        // Updated the Speed attribute
        dispatch(setEStopAll())
        // Send Command
        dispatch(sendLog(message))
    };

    return (
        <form action={`/e-stop`}
              method="post"
              className="e-stop"
              onSubmit={handleEStopSubmit}>
            <button type="submit">E-Stop</button>
        </form>
    );
};