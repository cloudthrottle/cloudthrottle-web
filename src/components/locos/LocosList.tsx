import React from "react";
import {LocosListItem} from "./LocosListItem";
import {Locos} from "../../types";

type LocosListProps = {
    locos: Locos
}

export const LocosList = ({locos}: LocosListProps) => {
    if (!locos.length) {
        return <EmptyLocosList/>
    }

    return (
        <ul>
            {locos.map((loco, index) => <LocosListItem loco={loco} key={index}/>)}
        </ul>
    )
}

const EmptyLocosList = () => {
    return (
        <p><small>No Locos...yet</small></p>
    )
}
