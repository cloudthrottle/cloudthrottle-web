import React, {FormEvent} from "react";
import {useDispatch} from "react-redux";
import {HandleSubmit} from "../../../types";
import {newLocoFormSubmit} from "../../../states/actions/locos";

export const LocosForm = () => {
    const dispatch = useDispatch()

    const handleNewLocoSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleNewLocoSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const name = formData.get('name')
        const cabId = formData.get("cabId")
        if (!name || !cabId) {
            return
        }

        dispatch(newLocoFormSubmit({
            name: name.toString(),
            cabId: parseInt(cabId.toString()),
        }))

        // @ts-ignore
        target.reset()
    }

    return (
        <div>
            <h2>New Loco</h2>
            <form action="locos/new" method="post" onSubmit={handleNewLocoSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" autoComplete="none"/>

                <label htmlFor="cabId">Cab ID</label>
                <input type="number" id="cabId" name="cabId" autoComplete="none" min={1}/>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}
