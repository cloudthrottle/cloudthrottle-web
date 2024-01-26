import {RootState} from "../../../states";
import React from "react";
import {useSelector} from "react-redux";
import {TurnoutsList} from "../../../components";
import {PopulateTurnouts} from "../../../components/turnouts/PopulateTurnoutsButton";

export const TurnoutsIndex = () => {
    const turnouts = useSelector((state: RootState) => state.turnouts.entities)

    return (
        <div className="container">
            <PopulateTurnouts/>
            <TurnoutsList turnouts={turnouts}/>
        </div>
    )
}
