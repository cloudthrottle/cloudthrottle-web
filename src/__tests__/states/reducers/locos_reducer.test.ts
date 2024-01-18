import {rostersReducer} from "../../../states/reducers/locos_reducer";
import {addOrUpdateLoco} from "../../../states/actions/locos";
import {Loco, LocosState} from "../../../types";
import {userResetState} from "../../../states/actions/stores";

describe("Locos reducer", () => {
    it("has initial state", () => {
        const locosState = rostersReducer(undefined, {type: 'INIT'})

        expect(locosState).toEqual({entities: {}})
    })

    it("resets all state on USER_RESET_STATE", () => {
        const action = userResetState()
        const initialLoco: Loco = {
            cabId: 1,
            name: 'Initial Loco',
            throttle: {direction: 1, speed: 0},
            functionButtons: {},
            sync: {
                rosterItemAt: null,
                rosterListAt: null
            },
            id: "",
        }

        const initialState: LocosState = {
            entities: {
                1: initialLoco
            }
        }
        const locosState = rostersReducer(initialState, action)

        expect(locosState).toEqual({entities: {}})
    })

    it("adds a Loco on ADD_OR_UPDATE_LOCO", () => {
        const action = addOrUpdateLoco({cabId: 1, name: 'test'})
        const locosState = rostersReducer(undefined, action)

        const expectedLoco = {
            cabId: 1,
            name: 'test',
            throttle: expect.any(Object),
            sync: expect.any(Object),
            functionButtons: expect.any(Object),
            id: expect.any(String),
        }

        expect(locosState).toEqual({entities: {1: expectedLoco}})
    })

    // FIXME: Test updating FunctionButtons and Throttle using ADD_OR_UPDATE_LOCO
    it("updates an existing Loco on ADD_OR_UPDATE_LOCO", () => {
        const initialLoco: Loco = {
            cabId: 1,
            name: 'Initial Loco',
            throttle: {direction: 1, speed: 0},
            functionButtons: {},
            sync: {
                rosterItemAt: null,
                rosterListAt: null
            },
            id: "",
        }

        const initialState: LocosState = {
            entities: {
                1: initialLoco
            }
        }

        const updatedLoco = {
            cabId: 1,
            name: 'Updated Loco',
        }

        const action = addOrUpdateLoco(updatedLoco)
        const locosState = rostersReducer(initialState, action)

        const expectedLoco = {
            cabId: 1,
            name: 'Updated Loco',
            throttle: expect.any(Object),
            sync: expect.any(Object),
            functionButtons: expect.any(Object),
            id: expect.any(String),
        }

        expect(locosState).toEqual({entities: {1: expectedLoco}})
    })
})
