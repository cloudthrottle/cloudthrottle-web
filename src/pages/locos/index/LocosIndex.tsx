import {RootState, sendLog} from "../../../states";
import React from "react";
import {LocosList} from "../../../components/locos";
import {useDispatch, useSelector} from "react-redux";
import {rosterCommand} from "@cloudthrottle/dcc-ex--commands";

export const LocosIndex = () => {
    const locos = useSelector((state: RootState) => state.locos)
    const dispatch = useDispatch()

    const handlePopulateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handlePopulateSubmit")
        event.preventDefault()
        const message = rosterCommand()
        // Send Command
        dispatch(sendLog(message))
    };

    return (
        <>
            <form action={`/populate`}
                  method="post"
                  className="populate"
                  onSubmit={handlePopulateSubmit}>
                <button type="submit">Populate from Roster</button>
            </form>
            <LocosList locos={locos}/>
        </>
    )
}
