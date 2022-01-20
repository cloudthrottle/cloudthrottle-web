import {useDispatch, useSelector} from "react-redux";
import {RootState, sendLog, setAllPower} from "../../states";
import React from "react";
import {BitValue, powerCommand} from "@cloudthrottle/dcc-ex--commands";

export const Powers = () => {
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