import React from "react";
import {Loco} from "../../types";

type LocosListItemProps = {
    loco: Loco
}

export const LocosListItem = ({loco}: LocosListItemProps) => {
    return <li>{loco}</li>
}