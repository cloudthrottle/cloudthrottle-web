import {RootState} from "../../../states";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {TurnoutsList} from "../../../components";
import {userPopulateTurnouts} from "../../../states/actions/turnouts";

export const TurnoutsIndex = () => {
    const turnouts = useSelector((state: RootState) => state.turnouts.entities)

    return (
        <div className="container">
            <TurnoutsList turnouts={turnouts}/>
        </div>
    )
}
