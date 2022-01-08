import React from "react"
import {useGlobalContext} from "../../contexts";
import {Throttle} from "../../components";

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