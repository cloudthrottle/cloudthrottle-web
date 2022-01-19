import React from "react"
import {RootState} from "../../states";
import {Throttle} from "../../components";
import {useSelector} from "react-redux";

export const Throttles = () => {
    const locos = useSelector((state: RootState) => state.locos)

    return (
        <div>
            <h2>Throttles</h2>

            <div className="container">
                {locos.map((loco, index) => <Throttle key={index} loco={loco}/>)}
            </div>
        </div>
    )
}
