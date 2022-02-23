import {useDispatch} from "react-redux";
import React from "react";
import {userEmergencyStop} from "../../states/actions/throttles";
import {Locos} from "../../types";

export const EStop = ({locos}: { locos: Locos }) => {
    const dispatch = useDispatch()

    const handleEStopSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleEStopSubmit")
        event.preventDefault()
        // Updated the Speed attribute
        dispatch(userEmergencyStop({locos}))
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