import {useDispatch} from "react-redux";
import React, {FormEvent} from "react";
import {userResetState} from "../../states/actions/stores";

export const ResetStateForm = () => {
    const dispatch = useDispatch()

    const handleResetState = (event: FormEvent) => {
        event.preventDefault()

        dispatch(userResetState())
    }

    return (
        <form action="/stores/reset" method="post" onSubmit={handleResetState}>
            <button type="submit">Reset State</button>
        </form>
    );
}
