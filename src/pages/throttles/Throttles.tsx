import React from "react"
import {RootState} from "../../contexts";
import {Throttle} from "../../components";
import {useSelector} from "react-redux";

export const Throttles = () => {
    const locos = useSelector((state: RootState) => {
      console.log(state);
      return state.locos;
    })

    return (
        <div>
            <h2>Throttles</h2>

            <div className="container">
                {locos.map((loco, index) => <Throttle key={index} loco={loco}/>)}
            </div>

        </div>
    )
}
