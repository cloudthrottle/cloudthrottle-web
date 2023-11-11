import React, {FormEvent} from "react";
import {useDispatch} from "react-redux";
import {HandleSubmit} from "../../../types";
import {newTurnoutFormSubmit} from "../../../states/actions/turnouts";
import {PopulateTurnouts} from "../../../components/turnouts/PopulateTurnoutsButton";

export const TurnoutsForm = () => {
    const dispatch = useDispatch()

    const handleNewTurnoutSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleNewTurnoutSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const id = formData.get('id')
        const address = formData.get("address")
        if (!id || !address) {
            return
        }

        dispatch(newTurnoutFormSubmit({
            id: parseInt(id.toString()),
            address: parseInt(address.toString()),
        }))

        // @ts-ignore
        target.reset()
    }

    return (
        <div>
            <PopulateTurnouts/>

            <h2>New Turnout</h2>
            <form action="turnouts/new" method="post" onSubmit={handleNewTurnoutSubmit}>
                <label htmlFor="id">ID</label>
                <input type="number" id="id" name="id" autoComplete="none" min={1} inputMode="numeric"/>

                <label htmlFor="address">Address</label>
                <input type="number" id="address" name="address" autoComplete="none" min={1} inputMode="numeric"/>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}
