import React from "react";
import {TurnoutsListItem} from "./TurnoutsListItem";
import {Turnouts} from "../../types";

type TurnoutsListProps = {
    turnouts: Turnouts
}

export const TurnoutsList = ({turnouts}: TurnoutsListProps) => {
    if (!Object.values(turnouts).length) {
        return <EmptyTurnoutsList/>
    }

    return (
        <ul>
            {Object.entries(turnouts).map(([id, turnout]) => <TurnoutsListItem turnout={turnout} key={id}/>)}
        </ul>
    )
}

const EmptyTurnoutsList = () => {
    return (
        <p><small>No Turnouts...yet</small></p>
    )
}
