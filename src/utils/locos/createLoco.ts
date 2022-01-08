import {Loco, LocosState, SetGlobalState} from "../../types";

export function createLoco(setGlobalState: SetGlobalState, name: File | string) {
    setGlobalState(prevState => {
        const {locos: prevLocos} = prevState
        const loco: Loco = {
            name: name.toString(),
            throttle: {
                speed: 0,
                direction: 1
            }
        }
        const locos: LocosState = [...prevLocos, loco]
        return {...prevState, locos}
    })
}