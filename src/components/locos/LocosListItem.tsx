import React from "react";
import {Loco} from "../../types";

type LocosListItemProps = {
    loco: Loco
}

export const LocosListItem = ({loco}: LocosListItemProps) => {
    return <li id={`loco_${loco.id}`}>{loco.cabId}: {loco.name}</li>
}
