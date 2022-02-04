import React from "react";
import {LocosListItem} from "./LocosListItem";
import {Locos} from "../../types";

type LocosListProps = {
    locos: Locos
}

export const LocosList = ({locos}: LocosListProps) => {
    if (!Object.values(locos).length) {
        return <EmptyLocosList/>
    }

    return (
        <ul>
            {Object.entries(locos).map(([cabId, loco]) => <LocosListItem loco={loco} key={cabId}/>)}
        </ul>
    )
}

const EmptyLocosList = () => {
    return (
        <p><small>No Locos...yet</small></p>
    )
}
