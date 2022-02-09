import {AddLocoParams, Loco, LocoSync, ThrottleState} from "../../types";
import {v4 as uuid} from "uuid";
import {buildFunctionButtons} from "./buildFunctionButtons";
import {FunctionButton, FunctionButtons} from "@cloudthrottle/dcc-ex--commands";

export type BuildLocoParams = AddLocoParams
type BuildLoco = (params: BuildLocoParams) => Loco

type MergeLocoParams = {
    loco: AddLocoParams,
    existingLoco: Loco
}
type MergeLoco = (params: MergeLocoParams) => Loco

type MergeThrottleParams = { throttle: Partial<ThrottleState> | undefined; existingThrottle: ThrottleState };

function mergeThrottle({existingThrottle, throttle}: MergeThrottleParams): ThrottleState {
    return {
        ...existingThrottle,
        ...throttle
    }
}

type MergeFunctionButtonsParams = { functionButtons: FunctionButtons<Partial<FunctionButton>> | undefined; existingFunctionButtons: FunctionButtons };

function mergeFunctionButtons({functionButtons, existingFunctionButtons}: MergeFunctionButtonsParams): FunctionButtons {
    return Object.entries(existingFunctionButtons).reduce((acc, [currentKey, currentValue]) => {
        let buttonData = {}
        if (functionButtons) {
            buttonData = functionButtons[parseInt(currentKey)]
        }

        acc[parseInt(currentKey)] = {
            ...currentValue,
            ...buttonData
        }
        return acc
    }, {} as FunctionButtons);
}

type MergeSyncParams = { sync: Partial<LocoSync> | undefined; existingSync: LocoSync };

function mergeSync({sync, existingSync}: MergeSyncParams): LocoSync {
    return {
        ...existingSync,
        ...sync
    }
}

export const mergeLoco: MergeLoco = ({existingLoco, loco}): Loco => {
    const deepMergeObjects: Pick<Loco, 'throttle' | 'functionButtons' | 'sync'> = {
        throttle: mergeThrottle({
            existingThrottle: existingLoco.throttle,
            throttle: loco.throttle
        }),
        functionButtons: mergeFunctionButtons({
            existingFunctionButtons: existingLoco.functionButtons,
            functionButtons: loco.functionButtons
        }),
        sync: mergeSync({
            existingSync: existingLoco.sync,
            sync: loco.sync
        })
    }

    return {
        ...existingLoco,
        ...loco,
        ...deepMergeObjects
    }
}

export const buildLoco: BuildLoco = (params) => {
    const defaultParams: Loco = {
        id: uuid(),
        name: "",
        cabId: 5,
        throttle: {
            speed: 0,
            direction: 1
        },
        functionButtons: buildFunctionButtons(),
        sync: {
            rosterListAt: null,
            rosterItemAt: null
        }
    }

    return mergeLoco({
        existingLoco: defaultParams,
        loco: params
    })
}