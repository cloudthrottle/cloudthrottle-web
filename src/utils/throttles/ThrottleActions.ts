import {GlobalState, Loco, Locos, SetGlobalState} from "../../types";
import {writeCabCommand, writeThrottleCommand} from "./WriteThrottleCommand";
import {BitValue} from "@cloudthrottle/dcc-ex--commands";

export type SetSpeedAction = (loco: Loco, speed: number) => void;
export type SetEStopAction = (loco: Loco) => void;
export type SetStopAction = (loco: Loco) => void;
export type SetDirectionAction = (loco: Loco, direction: number) => void;
export type FunctionButtonActionParams = {
    name: number,
    value: BitValue
}
export type SetFunctionAction = (loco: Loco, functionButton: FunctionButtonActionParams) => void;

export type ThrottleActions = {
    setSpeed: SetSpeedAction,
    setDirection: SetDirectionAction
    setFunctionValue: SetFunctionAction
    setEStop: SetEStopAction
    setStop: SetStopAction
}

type PerformSetSpeedParams = {
    setGlobalContext: SetGlobalState;
    globalContext: GlobalState;
    loco: Loco;
    speed: number;
}

function performSetSpeed({setGlobalContext, loco, speed, globalContext}: PerformSetSpeedParams) {
    setGlobalContext((prevState) => {
        const {locos: prevLocosState} = prevState
        const prevLoco = prevLocosState.find(prevLoco => prevLoco.name === loco.name)
        if (!prevLoco) {
            return prevState
        }

        const {throttle: prevThrottle} = prevLoco
        const throttle = {...prevThrottle, speed}
        const newLoco: Loco = {...prevLoco, throttle}
        const locos: Locos = prevLocosState.map(prevLoco => prevLoco.name === newLoco.name ? newLoco : prevLoco)
        writeThrottleCommand({
            loco: newLoco,
            context: {
                globalContext,
                setGlobalContext
            }
        });
        const state = {...prevState, locos}
        console.log(state);
        return state
    })
}

function setSpeedAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetSpeedAction {
    return (loco, speed) => {
        performSetSpeed({setGlobalContext, loco, speed, globalContext});
    }
}

function setEStopAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetEStopAction {
    return (loco) => {
        performSetSpeed({setGlobalContext, loco, speed: -1, globalContext});
    }
}

function setStopAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetStopAction {
    return (loco) => {
        performSetSpeed({setGlobalContext, loco, speed: 0, globalContext});
    }
}

function setDirectionAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetDirectionAction {
    return (loco, direction) => {
        setGlobalContext((prevState) => {
            const {locos: prevLocosState} = prevState
            const prevLoco = prevLocosState.find(prevLoco => prevLoco.name === loco.name)
            if (!prevLoco) {
                return prevState
            }

            const {throttle: prevThrottle} = prevLoco
            const throttle = {...prevThrottle, direction}
            const newLoco: Loco = {...prevLoco, throttle}
            const locos: Locos = prevLocosState.map(prevLoco => prevLoco.name === newLoco.name ? newLoco : prevLoco)
            writeThrottleCommand({
                loco: newLoco,
                context: {
                    globalContext,
                    setGlobalContext
                }
            });
            return {...prevState, locos}
        })
    }
}

function setFunctionAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetFunctionAction {
    return (loco, {name, value}) => {
        setGlobalContext((prevState) => {
            const {locos: prevLocosState} = prevState
            const prevLoco = prevLocosState.find(prevLoco => prevLoco.name === loco.name)
            if (!prevLoco) {
                return prevState
            }

            // const {throttle: prevThrottle} = prevLoco
            // const throttle = {...prevThrottle, direction}
            const newLoco: Loco = {...prevLoco}
            // const locos: Locos = prevLocosState.map(prevLoco => prevLoco.name === newLoco.name ? newLoco : prevLoco)
            writeCabCommand({
                loco: newLoco,
                context: {
                    globalContext,
                    setGlobalContext
                },
                functionName: name,
                functionValue: value
            });
            return {...prevState}
        })
    }
}

export const throttleActions = (globalContext: GlobalState, setGlobalContext: any): ThrottleActions => {
    return {
        setSpeed: setSpeedAction(globalContext, setGlobalContext),
        setDirection: setDirectionAction(globalContext, setGlobalContext),
        setFunctionValue: setFunctionAction(globalContext, setGlobalContext),
        setEStop: setEStopAction(globalContext, setGlobalContext),
        setStop: setStopAction(globalContext, setGlobalContext)
    };
};
