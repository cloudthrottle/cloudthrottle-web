import {PartialFunctionButtons} from "../../types";
import {FunctionButton, FunctionButtonKind, FunctionButtons} from "@cloudthrottle/dcc-ex--commands";
import {WebThrottleMap, WebThrottleMaps} from "../../states/actions/stores";

export const buildFunctionButtons = (buttons: PartialFunctionButtons | undefined = {}): FunctionButtons => {
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

export const convertWebThrottleMaps = (webThrottleMaps: WebThrottleMaps | undefined = []): PartialFunctionButtons[] => {
  return webThrottleMaps?.map(convertWebThrottleMapToFunctionButtons)
}

export const convertWebThrottleMapToFunctionButtons = (webThrottleMap: WebThrottleMap | undefined): PartialFunctionButtons => {
  if (webThrottleMap === undefined) {
    return {}
  }
  const {fnData} = webThrottleMap
  return Object.entries(fnData)
    .reduce((acc, [fnName, buttonData]) => {
      const name = parseInt(fnName.replace('f', '')) //.remove("f").parseInt
      const [state, typeNumber, display, visible] = buttonData

      const kind = typeNumber === 1 ? FunctionButtonKind.PRESS : FunctionButtonKind.TOGGLE
      const functionButton: FunctionButton = {
        value: state,
        kind,
        display
      }

      return {
        ...acc,
        [name]: functionButton
      }
    }, {} as PartialFunctionButtons)
}
