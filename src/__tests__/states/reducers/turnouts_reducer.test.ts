import {AddOrUpdateTurnoutParams, Turnout, TurnoutsState} from "../../../types";
import {userResetState} from "../../../states/actions/stores";
import {turnoutsReducer} from "../../../states/reducers/turnouts_reducer";
import {addOrUpdateTurnout} from "../../../states/actions/turnouts";

describe("Turnouts reducer", () => {
    it("has initial state", () => {
        const turnoutsState = turnoutsReducer(undefined, {type: 'INIT'})

        expect(turnoutsState).toEqual({entities: {}})
    })

    it("resets all state on USER_RESET_STATE", () => {
        const action = userResetState()
        const initialTurnout: Turnout = {
            id: 1,
            position: 0,
            address: 10,
        }

        const initialState: TurnoutsState = {
            entities: {
                1: initialTurnout
            }
        }
        const turnoutsState = turnoutsReducer(initialState, action)

        expect(turnoutsState).toEqual({entities: {}})
    })

    it("adds a Turnout on ADD_OR_UPDATE_TURNOUT", () => {
        const action = addOrUpdateTurnout({id: 1, address: 10})
        const turnoutsState = turnoutsReducer(undefined, action)

        const expectedTurnout: Turnout = {
            id: 1,
            position: 0,
            address: 10,
        }

        expect(turnoutsState).toEqual({entities: {1: expectedTurnout}})
    })

    it("updates an existing Turnout on ADD_OR_UPDATE_TURNOUT", () => {
        const initialTurnout: Turnout = {
            id: 1,
            position: 0,
            address: 10,
        }

        const initialState: TurnoutsState = {
            entities: {
                1: initialTurnout
            }
        }

        const updatedTurnout: AddOrUpdateTurnoutParams = {
            id: 1,
            position: 1,
        }

        const action = addOrUpdateTurnout(updatedTurnout)
        const turnoutsState = turnoutsReducer(initialState, action)

        const expectedTurnout: Turnout = {
            id: 1,
            position: 1,
            address: 10,
        }

        expect(turnoutsState).toEqual({entities: {1: expectedTurnout}})
    })
})
