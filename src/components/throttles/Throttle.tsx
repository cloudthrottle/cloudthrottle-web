import {Loco} from "../../types";
import {setDirection, setEStop, setSpeed, setStop} from "../../contexts";
import React, {SyntheticEvent, useState} from "react";
import {Direction} from "@cloudthrottle/dcc-ex--commands";
import {useDispatch} from "react-redux";

type ThrottleProps = {
    loco: Loco
}
export const Throttle = ({loco}: ThrottleProps) => {
    const {throttle: {speed, direction}} = loco
    const dispatch = useDispatch()

    const handleFunctionSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault()
        return

        // const {nativeEvent: {submitter}} = event
        // const {name, value} = submitter as HTMLButtonElement
        // if (name === "more") {
        //     return
        // }
        // setFunctionValue(loco, {
        //     name: parseInt(name),
        //     value: parseInt(value) as BitValue
        // })
    };

    const handleSpeedChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.debug("handleSpeedChange")
        event.preventDefault()

        const {target} = event
        const formData = target as HTMLInputElement
        const speed = formData.valueAsNumber
        if (!speed) {
            return
        }

        dispatch(setSpeed({loco, speed}))
    };

    const handleStopSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleStopSubmit")
        event.preventDefault()

        dispatch(setStop({loco}))
    };

    const handleEStopSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.debug("handleEStopSubmit")
        event.preventDefault()

        dispatch(setEStop({loco}))
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

        dispatch(setDirection({loco, direction}))
    };

    const buttons = loco.functionButtons?.slice(0, 4) || []
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
                    return <FunctionButton key={index}
                                           labelName={button.display}
                                           name={button.name}
                                           value={button.value}/>;
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
    name: number
    value: number
}

const FunctionButton = ({name, value: initialValue, labelName}: FunctionButtonProps) => {
    const [value, setValue] = useState(initialValue)

    const handleOnClick = () => {
        setValue((prevState => prevState === 0 ? 1 : 0))
    }

    return (
        <button onClick={handleOnClick} disabled={true} name={name.toString()} value={value}>{labelName}</button>
    )
}
