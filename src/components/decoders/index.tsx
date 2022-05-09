import {useDispatch} from "react-redux";
import React, {FormEvent} from "react";
import {userDecoderReadAddress} from "../../states/actions/decoders";

export const ReadForm = () => {
    const dispatch = useDispatch()

    const handleRead = (event: FormEvent) => {
        event.preventDefault()

        dispatch(userDecoderReadAddress())
    }

    return (
        <form action="/decoders/read_address" method="post" onSubmit={handleRead}>
            <button type="submit">Read Address</button>
        </form>
    );
}
