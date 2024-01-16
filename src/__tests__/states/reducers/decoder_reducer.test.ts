import {userResetState} from "../../../states/actions/stores";
import {decoderReducer} from "../../../states/reducers/decoders_reducer";
import {DecoderState} from "../../../types";
import {updateLastReadAddressState} from "../../../states/actions/decoders";

describe("decoder reducer", () => {
    it("has initial state", () => {
        const decodersState = decoderReducer(undefined, {type: 'INIT'})

        expect(decodersState).toEqual({readAddresses: []})
    })

    it("prepends an address on UPDATE_LAST_READ_ADDRESS_STATE", () => {
        const action = updateLastReadAddressState(22)
        const decodersState = decoderReducer({readAddresses: [1]}, action)

        expect(decodersState).toEqual({readAddresses: [22, 1]})
    })

    it("resets all state on USER_RESET_STATE", () => {
        const action = userResetState()
        const preActionState: DecoderState = {readAddresses: [22, 23, 24]}
        const decodersState = decoderReducer(preActionState, action)

        expect(decodersState).toEqual({readAddresses: []})
    })
})
