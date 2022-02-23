import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../states";
import React from "react";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";
import {userChangedPower} from "../../states/actions/powers";

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

        dispatch(userChangedPower(power))
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
