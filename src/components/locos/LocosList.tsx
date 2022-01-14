import React from "react";
import {LocosListItem} from "./LocosListItem";
import {Locos} from "../../types";
import {addLoco, setSpeed} from "../../contexts";
import {useDispatch} from "react-redux";

type LocosListProps = {
    locos: Locos
}

export const LocosList = ({locos}: LocosListProps) => {
    return (
        <ul>
            {locos.map((loco, index) => <LocosListItem loco={loco} key={index}/>)}
        </ul>
    )
}
