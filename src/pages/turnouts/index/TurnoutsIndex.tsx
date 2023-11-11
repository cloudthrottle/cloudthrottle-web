import {RootState} from "../../../states";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {TurnoutsList} from "../../../components";
import {userPopulateTurnouts} from "../../../states/actions/turnouts";

export const TurnoutsIndex = () => {
    const turnouts = useSelector((state: RootState) => state.turnouts.entities)
    const dispatch = useDispatch()

    const handlePopulateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handlePopulateTurnoutsSubmit")
        event.preventDefault()

        dispatch(userPopulateTurnouts())
    };

    return (
        <>
            <form action={`/populate`}
                  method="post"
                  className="populate"
                  onSubmit={handlePopulateSubmit}>
                <button type="submit">Populate from Command Station</button>
            </form>
            <TurnoutsList turnouts={turnouts}/>
        </>
    )
}
