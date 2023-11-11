import {useDispatch} from "react-redux";
import React from "react";
import {userPopulateTurnouts} from "../../states/actions/turnouts";

export const PopulateTurnouts = () => {
    const dispatch = useDispatch()
    const handlePopulateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handlePopulateTurnoutsSubmit")
        event.preventDefault()

        dispatch(userPopulateTurnouts())
    };
    return <form action={`/populate`}
                 method="post"
                 className="populate"
                 onSubmit={handlePopulateSubmit}>
        <button type="submit">Populate from Command Station</button>
    </form>;
}
