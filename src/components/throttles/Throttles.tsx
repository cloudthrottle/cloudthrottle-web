import {useSelector} from "react-redux";
import {RootState} from "../../states";
import {Throttle} from "./Throttle";
import React from "react";

export const Throttles = () => {
    const locos = useSelector((state: RootState) => state.locos)

    return (
        <>
            {locos.map((loco, index) => <Throttle key={index} loco={loco}/>)}
        </>
    );
};