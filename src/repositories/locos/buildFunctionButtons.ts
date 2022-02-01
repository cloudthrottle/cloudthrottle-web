import {PartialFunctionButtons} from "../../types";
import {FunctionButtonKind, FunctionButtons} from "@cloudthrottle/dcc-ex--commands";

export const buildFunctionButtons = (buttons: PartialFunctionButtons = []): FunctionButtons => {
    return Array(29).fill(null)
        .reduce((acc, currentValue, currentIndex) => {
            const buttonData = buttons[currentIndex]

            acc[currentIndex] = {
                value: 0,
                display: `F${currentIndex}`,
                kind: FunctionButtonKind.TOGGLE,
                ...buttonData
            }
            return acc
        }, {} as FunctionButtons);
};