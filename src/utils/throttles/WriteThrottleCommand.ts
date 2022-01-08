import {throttleCommand} from "@cloudthrottle/dcc-ex--commands";
import {GlobalState, Loco, LogItem, SetGlobalState} from "../../types";
import {prependLogItem} from "../communications";

interface WriteThrottleCommand {
    context: {
        globalContext: GlobalState;
        setGlobalContext: SetGlobalState
    }
    loco: Loco;
}

export function writeThrottleCommand({loco, context: {globalContext, setGlobalContext}}: WriteThrottleCommand) {
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