import {Loco} from "../../types";
import {useGlobalContext} from "../../contexts";
import {throttleActions} from "../../utils";
import React from "react";

type ThrottleProps = {
    loco: Loco
}
export const Throttle = ({loco}: ThrottleProps) => {
    const {throttle: {speed, direction}} = loco

    const [globalContext, setGlobalContext] = useGlobalContext()
    const {setSpeed, setDirection} = throttleActions(globalContext, setGlobalContext);

    return (
        <div className="loco">
            <div className="name">
                <h2>{loco.name}</h2>
            </div>
            <div>
                <span onClick={() => setSpeed(loco, speed + 1)}>{speed}</span>
            </div>
            <div>
                <span onClick={() => setDirection(loco, direction === 1 ? 0 : 1)}>{direction}</span>
            </div>
        </div>
    )
}