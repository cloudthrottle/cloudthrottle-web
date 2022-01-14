import {cabCommand, throttleCommand, BitValue} from "@cloudthrottle/dcc-ex--commands";
import {GlobalState, Loco, LogItem, SetGlobalState} from "../../types";
import {prependLogItem} from "../communications";

interface WriteCommand {
    context: {
        globalContext: GlobalState;
        setGlobalContext: SetGlobalState
    }
}

interface WriteThrottleCommand extends WriteCommand{
    loco: Loco;
}

interface WriteCabCommand extends WriteThrottleCommand {
    functionName: number,
    functionValue: BitValue
}

export function writeThrottleCommand({loco, context: {globalContext, setGlobalContext}}: WriteThrottleCommand) {
    const {communications: {writer}} = globalContext
    if (!writer) {
        return;
    }

    const commandOptions = {
        ...loco.throttle,
        cab: loco.cabId
    }
    const command = throttleCommand(commandOptions)
    const log: LogItem = {
        kind: "sent",
        message: command
    }
    prependLogItem(setGlobalContext, log)
    void writer.write(command)
}

export function writeCabCommand({loco, context: {globalContext, setGlobalContext}, functionName, functionValue}: WriteCabCommand) {
    const {communications: {writer}} = globalContext
    if (!writer) {
        return;
    }

    const commandOptions = {
        cab: loco.cabId,
        func: functionName,
        value: functionValue
    }
    const command = cabCommand(commandOptions)
    const log: LogItem = {
        kind: "sent",
        message: command
    }
    prependLogItem(setGlobalContext, log)
    void writer.write(command)
}
