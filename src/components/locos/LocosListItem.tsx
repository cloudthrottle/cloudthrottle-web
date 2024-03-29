import React from "react";
import {Loco} from "../../types";

type LocosListItemProps = {
    loco: Loco
}

export const LocosListItem = ({loco}: LocosListItemProps) => {
    return (
        <li id={`loco_${loco.cabId}`}>
            <h3><strong>{loco.cabId}:</strong> {loco.name}</h3>
        </li>
    )
}
