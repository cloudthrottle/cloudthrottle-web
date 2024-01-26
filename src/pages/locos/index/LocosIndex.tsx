import {RootState} from "../../../states";
import React from "react";
import {LocosList} from "../../../components/locos";
import {useDispatch, useSelector} from "react-redux";
import {userPopulateRoster} from "../../../states/actions/locos/loco_actions";

export const LocosIndex = () => {
    const locos = useSelector((state: RootState) => state.roster.entities)
    const dispatch = useDispatch()

    const handlePopulateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handlePopulateSubmit")
        event.preventDefault()

        dispatch(userPopulateRoster())
    };

    return (
        <>
            <form action={`/populate`}
                  method="post"
                  className="populate"
                  onSubmit={handlePopulateSubmit}>
                <button type="submit">Populate from Roster</button>
            </form>
            <LocosList locos={locos}/>
        </>
    )
}
