import {useGlobalContext} from "../../../contexts";
import {HandleSubmit} from "../../../utils";
import React, {FormEvent} from "react";
import {createLoco} from "../../../utils/locos";

export const LocosForm = () => {
    const [, setGlobalState] = useGlobalContext();

    const handleNewLocoSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleNewLocoSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const name = formData.get('name')
        if (!name) {
            return
        }
        createLoco(setGlobalState, name);

        // @ts-ignore
        target.reset()
    }

    return (
        <div>
            <h2>New Loco</h2>
            <form action="locos/new" method="post" onSubmit={handleNewLocoSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name"/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}