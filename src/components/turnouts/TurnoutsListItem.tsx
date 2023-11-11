import React, {SyntheticEvent} from "react";
import {Turnout, TurnoutPosition} from "../../types";
import {useDispatch} from "react-redux";
import {userChangedTurnoutPosition} from "../../states/actions/turnouts";

type TurnoutsListItemProps = {
    turnout: Turnout
}

export const TurnoutsListItem = ({turnout}: TurnoutsListItemProps) => {
    const dispatch = useDispatch()
    function handlePositionToggleSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault()

        const {nativeEvent: {submitter}} = event
        const {value: currentPosition} = submitter as HTMLButtonElement
        const newPosition = parseInt(currentPosition) === TurnoutPosition.CLOSED ? TurnoutPosition.THROWN : TurnoutPosition.CLOSED;

        dispatch(userChangedTurnoutPosition({
            turnout,
            position: newPosition
        }))
    }

    return (
        <div id={`turnout_${turnout.id}`} className="turnout">
            <div className="id">
                <h2 className="p-0 m-0">{turnout.id}</h2>
            </div>

            <div className="name">
                <h2>{turnout.position === 0 ? "Closed" : "Thrown"}</h2>
            </div>

            <form action={`/turnouts/${turnout.id}/toggle`}
                  method="post"
                  className="turnout_position_control"
                  onSubmit={handlePositionToggleSubmit}>
                <PositionButton id={turnout.id} value={turnout.position}/>
            </form>


        </div>

    )
}

type PositionButtonProps = {
    id: number
    value: TurnoutPosition
}

const PositionButton = ({id, value}: PositionButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {target} = event
        const button = target as HTMLButtonElement
        button.blur()
    }
    return (
        <button className="turnout_position" onClick={handleClick} id={`turnout_${id.toString()}_position`} value={value}>
            {value === TurnoutPosition.CLOSED ? "Throw" : "Close"}
        </button>
    )
}
