import {useSelector} from "react-redux";
import {RootState} from "../../states";
import {Throttle} from "./Throttle";
import React from "react";
import {Powers} from "./Power";
import {EStop} from "./EStop";

export const Throttles = () => {
    const locos = useSelector((state: RootState) => state.locos)

    if (!locos.length) {
        return <EmptyThrottlesList/>
    }

    return (
        <>
            <div className="global-controls">
                <Powers/>
                <EStop/>
            </div>
            {locos.map((loco, index) => <Throttle key={index} loco={loco}/>)}
        </>
    );
};

const EmptyThrottlesList = () => {
    return (
        <p><small>Add a Loco to get started...</small></p>
    )
}