import {FunctionButtonsState, Loco, LocosState, SetGlobalState} from "../../types";

type CreateLocoParams = {
    name: string,
    cabId: number
}

const defaultFunctionButtonsState: FunctionButtonsState = Array.from(Array(30)).map((value, index) => {
    return {
        name: index,
        value,
        display: `F${index}`
    }
})

export function createLoco(setGlobalState: SetGlobalState, {name, cabId}: CreateLocoParams) {
    setGlobalState(prevState => {
        const {locos: prevLocos} = prevState
        const loco: Loco = {
            name: name.toString(),
            cabId,
            throttle: {
                speed: 0,
                direction: 1
            },
            functionButtons: defaultFunctionButtonsState
        }
        const locos: LocosState = [...prevLocos, loco]
        return {...prevState, locos}
    })
}