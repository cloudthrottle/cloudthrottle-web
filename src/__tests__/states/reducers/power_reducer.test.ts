import {powersReducer} from "../../../states/reducers/power_reducer";
import {userResetState} from "../../../states/actions/stores";
import {updatePowerState} from "../../../states/actions/powers";
import {PowersState} from "../../../types/powers";

describe("power reducer", () => {
    it("has initial state", () => {
        const powersState = powersReducer(undefined, {type: 'INIT'})

        expect(powersState).toEqual({JOIN: 0, MAIN: 0, PROG: 0})
    })

    it("updates all state on UPDATE_POWER_STATE", () => {
        const action = updatePowerState(1)
        const powersState = powersReducer(undefined, action)

        expect(powersState).toEqual({JOIN: 1, MAIN: 1, PROG: 1})
    })

    it("resets all state on USER_RESET_STATE", () => {
        const action = userResetState()
        const preActionState: PowersState = {JOIN: 1, MAIN: 1, PROG: 1}
        const powersState = powersReducer(preActionState, action)

        expect(powersState).toEqual({JOIN: 0, MAIN: 0, PROG: 0})
    })
})
