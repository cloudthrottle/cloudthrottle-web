import {Loco, Locos, SetGlobalState} from "../../types";

export type SetSpeedAction = (loco: Loco, speed: number) => void;
export type SetDirectionAction = (loco: Loco, direction: number) => void;

export type ThrottleActions = {
    setSpeed: SetSpeedAction,
    setDirection: SetDirectionAction
}

function setSpeedAction(setGlobalState: SetGlobalState): SetSpeedAction {
    return (loco, speed) => {
        setGlobalState((prevState) => {
            const {locos: prevLocosState} = prevState
            const prevLoco = prevLocosState.find(prevLoco => prevLoco.name === loco.name)
            if (!prevLoco) {
                return prevState
            }

            const {throttle: prevThrottle} = prevLoco
            const throttle = {...prevThrottle, speed}
            const newLoco: Loco = {...prevLoco, throttle}
            const locos: Locos = prevLocosState.map(prevLoco => prevLoco.name === newLoco.name ? newLoco : prevLoco)
            return {...prevState, locos}
        })
    }
}

function setDirectionAction(setGlobalState: SetGlobalState): SetSpeedAction {
    return (loco, direction) => {
        setGlobalState((prevState) => {
            const {locos: prevLocosState} = prevState
            const prevLoco = prevLocosState.find(prevLoco => prevLoco.name === loco.name)
            if (!prevLoco) {
                return prevState
            }

            const {throttle: prevThrottle} = prevLoco
            const throttle = {...prevThrottle, direction}
            const newLoco: Loco = {...prevLoco, throttle}
            const locos: Locos = prevLocosState.map(prevLoco => prevLoco.name === newLoco.name ? newLoco : prevLoco)
            return {...prevState, locos}
        })
    }
}

export const throttleActions = (setGlobalState: SetGlobalState): ThrottleActions => {
    return {
        setSpeed: setSpeedAction(setGlobalState),
        setDirection: setDirectionAction(setGlobalState)
    };
};