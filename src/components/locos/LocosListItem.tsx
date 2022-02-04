import React from "react";
import {Loco} from "../../types";
import {FunctionButton} from "@cloudthrottle/dcc-ex--commands";

type LocosListItemProps = {
    loco: Loco
}

export const LocosListItem = ({loco}: LocosListItemProps) => {
    return (
        <li id={`loco_${loco.id}`}>
            <div>{loco.cabId}: {loco.name}</div>
            <div>
                List Sync: {loco.sync.rosterListAt}
            </div>
            <div>
                Item Sync: {loco.sync.rosterItemAt}
            </div>
            <div>
                {Object.values(loco.functionButtons).map((button: FunctionButton) => <p>{button.display}</p>)}
            </div>
        </li>
    )
}
