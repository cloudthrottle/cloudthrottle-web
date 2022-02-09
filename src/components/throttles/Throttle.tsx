import {Loco} from "../../types";
import {sendLog, setButtonValue, setSpeed} from "../../states";
import React, {SyntheticEvent} from "react";
import {cabCommand, Direction, throttleCommand} from "@cloudthrottle/dcc-ex--commands";
import {useDispatch} from "react-redux";
import {userChangedDirection, userChangedSpeed} from "../../states/actions/throttles";

type ThrottleProps = {
    loco: Loco
}
export const Throttle = ({loco}: ThrottleProps) => {
    const {throttle: {speed, direction}} = loco
    const dispatch = useDispatch()

    const handleFunctionSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault()

        const {nativeEvent: {submitter}} = event
        const {name: nameValue, value: valueValue} = submitter as HTMLButtonElement
        if (nameValue === "more") {
            return
        }

        const name = parseInt(nameValue)
        const value = parseInt(valueValue) === 0 ? 1 : 0;
        const message = cabCommand({
            cab: loco.cabId,
            value,
            func: name
        })

        // Toggle the Button value attribute
        dispatch(setButtonValue({loco, name, value}))

        // Send Command
        dispatch(sendLog(message))
    };

    const handleSpeedChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.debug("handleSpeedChange")
        event.preventDefault()

        const {target} = event
        const formData = target as HTMLInputElement
        const speedValue = formData.value
        if (!speedValue) {
            return
        }
        const speed = parseInt(speedValue)

        dispatch(userChangedSpeed({loco, speed}))
    };

    const handleStopSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleStopSubmit")
        event.preventDefault()

        const message = throttleCommand({
            ...loco.throttle,
            cab: loco.cabId,
            speed: 0,
        })

        // Updated the Speed attribute
        dispatch(setSpeed({loco, speed: 0}))
        // Send Command
        dispatch(sendLog(message))
    };

    const handleEStopSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleEStopSubmit")
        event.preventDefault()

        const message = throttleCommand({
            ...loco.throttle,
            cab: loco.cabId,
            speed: -1,
        })

        // Updated the Speed attribute
        dispatch(setSpeed({loco, speed: -1}))
        // Send Command
        dispatch(sendLog(message))
    };

    const handleDirectionChange = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleDirectionChange")
        event.preventDefault()

        const {target} = event
        const formData = target as HTMLInputElement
        const directionValue = formData.value
        if (!directionValue) {
            return
        }
        const direction = parseInt(directionValue)

        dispatch(userChangedDirection({loco, direction}))
    };

    const buttons = Object.entries(loco.functionButtons)?.slice(0, 4) || []
    return (
        <div className="loco">
            <div className="name">
                <h2>{loco.name}</h2>
            </div>

            <div className="view">
                <button disabled={true}>view</button>
            </div>

            <form action={`/cabs/${loco.cabId}/e-stop`}
                  method="post"
                  className="e-stop"
                  onSubmit={handleEStopSubmit}>
                <button type="submit">E-Stop</button>
            </form>

            <form action={`/cabs/${loco.cabId}/function`}
                  method="post"
                  className="functions"
                  onSubmit={handleFunctionSubmit}>
                {buttons.map((button, index) => {
                    const [name, {display, value}] = button
                    return <FunctionButton key={index}
                                           labelName={display}
                                           name={name}
                                           value={value}/>;
                })}
                <button type="button" disabled={true}>more</button>
            </form>

            <form action={`/cabs/${loco.cabId}/speed`}
                  method="post"
                  className="speed">
                <input type="range"
                       name="speed"
                       value={speed}
                       min={0}
                       max={126}
                       onChange={handleSpeedChange}
                />
            </form>

            <form action={`/cabs/${loco.cabId}/stop`}
                  method="post"
                  className="stop"
                  onSubmit={handleStopSubmit}>
                <button type="submit">Stop</button>
            </form>

            <form action={`/cabs/${loco.cabId}/direction`}
                  method="post"
                  className="direction"
                  onChange={handleDirectionChange}>
                <select name="direction"
                        id="direction"
                        defaultValue={direction}>
                    <option value={Direction.FORWARD}>Forward</option>
                    <option value={Direction.REVERSE}>Reverse</option>
                </select>
            </form>
        </div>
    )
}

type FunctionButtonProps = {
    labelName: string
    name: string
    value: number
}

const FunctionButton = ({name, value, labelName}: FunctionButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {target} = event
        const button = target as HTMLButtonElement
        button.blur()
    }
    return (
        <button onClick={handleClick} name={name} value={value}>{labelName}</button>
    )
}
