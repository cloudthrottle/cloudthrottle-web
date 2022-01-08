import {GlobalState, Loco, Locos, LogItem, SetGlobalState} from "../../types";
import {throttleCommand} from "@cloudthrottle/dcc-ex--commands";
import {prependLogItem} from "../communications";

export type SetSpeedAction = (loco: Loco, speed: number) => void;
export type SetDirectionAction = (loco: Loco, direction: number) => void;

export type ThrottleActions = {
    setSpeed: SetSpeedAction,
    setDirection: SetDirectionAction
}

interface WriteThrottleCommand {
    context: {
        globalContext: GlobalState;
        setGlobalContext: SetGlobalState
    }
    loco: Loco;
}

function writeThrottleCommand({loco, context: {globalContext, setGlobalContext}}: WriteThrottleCommand) {
    const {communications: {writer}} = globalContext
    if (!writer) {
        return;
    }

    const commandOptions = {
        ...loco.throttle,
        cab: 3
    }
    const command = throttleCommand(commandOptions)
    const log: LogItem = {
        kind: "sent",
        message: command
    }
    prependLogItem(setGlobalContext, log)
    void writer.write(command)
}

function setSpeedAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetSpeedAction {
    return (loco, speed) => {
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
            return {...prevState, locos}
        })
    }
}

function setDirectionAction(globalContext: GlobalState, setGlobalContext: SetGlobalState): SetSpeedAction {
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

export const throttleActions = (globalContext: GlobalState, setGlobalContext: any): ThrottleActions => {
    return {
        setSpeed: setSpeedAction(globalContext, setGlobalContext),
        setDirection: setDirectionAction(globalContext, setGlobalContext)
    };
};