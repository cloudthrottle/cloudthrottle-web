import React from "react"
import {RootState, sendLog, setAllPower} from "../../states";
import {Throttle} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {BitValue, powerCommand} from "@cloudthrottle/dcc-ex--commands";

const Powers = () => {
    const powers = useSelector((state: RootState) => state.powers)
    const dispatch = useDispatch()

    const handlePowerChange = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handlePowerChange")
        event.preventDefault()

        const {target} = event
        const formData = target as HTMLInputElement
        const powerValue = formData.value
        if (!powerValue) {
            return
        }
        const power = parseInt(powerValue) as BitValue

        const message = powerCommand({power})

        // Updated the Direction attribute
        dispatch(setAllPower(power))
        // Send Command
        dispatch(sendLog(message))
    };

    return (
        <form action={`/powers/all`}
              method="post"
              className="power"
              onChange={handlePowerChange}>
            <label htmlFor="power">
                Power
            </label>
            <select name="power"
                    id="power"
                    defaultValue={powers.MAIN}>
                <option value={1}>On</option>
                <option value={0}>Off</option>
            </select>
        </form>
    );
};

export const Throttles = () => {
    const locos = useSelector((state: RootState) => state.locos)

    return (
        <div>
            <h2>Throttles</h2>

            <div className="container">
                <Powers/>
                {locos.map((loco, index) => <Throttle key={index} loco={loco}/>)}
            </div>
        </div>
    )
}
