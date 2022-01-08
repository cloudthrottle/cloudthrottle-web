import React from "react"
import {useGlobalContext} from "../../contexts";
import {throttleActions} from "../../utils";
import {Loco} from "../../types";

export const Throttles = () => {
    const [{locos}] = useGlobalContext();

    return (
        <div>
            <h2>Throttles</h2>

            <div className="container">
                {locos.map((loco, index) => <Throttle key={index} loco={loco}/>)}
            </div>

        </div>
    )
}

type ThrottleProps = {
    loco: Loco
}
export const Throttle = ({loco}: ThrottleProps) => {
    const [, setGlobalState] = useGlobalContext();
    const {throttle: {speed, direction}} = loco

    const {setSpeed, setDirection} = throttleActions(setGlobalState);

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