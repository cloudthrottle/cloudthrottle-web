import React from "react";
import {Turnout} from "../../types";

type TurnoutsListItemProps = {
    turnout: Turnout
}

export const TurnoutsListItem = ({turnout}: TurnoutsListItemProps) => {
    return (
        <li id={`turnout_${turnout.id}`}>
            <div>
                <h3><strong>ID: {turnout.id}:</strong> <small>Address: {turnout.address}</small></h3>
                Position: {turnout.position}
            </div>
        </li>
    )
}
