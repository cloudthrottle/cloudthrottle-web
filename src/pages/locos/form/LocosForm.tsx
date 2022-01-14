import {addLoco, useGlobalContext} from "../../../contexts";
import {HandleSubmit} from "../../../utils";
import React, {FormEvent} from "react";
import {createLoco} from "../../../utils/locos";
import {useDispatch} from "react-redux";

export const LocosForm = () => {
    const [, setGlobalState] = useGlobalContext();
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

        createLoco(setGlobalState, {
            name: name.toString(),
            cabId: parseInt(cabId.toString())
        });

        dispatch(addLoco({
            name: name.toString(),
            cabId: parseInt(cabId.toString())
        }))

        // @ts-ignore
        target.reset()
    }

    return (
        <div>
            <h2>New Loco</h2>
            <form action="locos/new" method="post" onSubmit={handleNewLocoSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name"/>

                <label htmlFor="cabId">Cab ID</label>
                <input type="number" id="cabId" name="cabId"/>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}
