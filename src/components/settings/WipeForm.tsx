import {useDispatch} from "react-redux";
import React, {FormEvent} from "react";
import {userResetAndClearData} from "../../states/actions/stores";

export const WipeForm = () => {
    const dispatch = useDispatch()

    const handleWipe = (event: FormEvent) => {
        event.preventDefault()

        dispatch(userResetAndClearData())
    }

    return (
        <form action="/stores/wipe" method="post" onSubmit={handleWipe}>
            <button type="submit">Wipe</button>
        </form>
    );
}
