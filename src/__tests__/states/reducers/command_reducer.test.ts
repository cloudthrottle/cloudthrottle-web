import {userResetState} from "../../../states/actions/stores";
import {addCommandToLog, commandWrite} from "../../../states/actions/commands";
import {commandReducer} from "../../../states/reducers/command_reducer";
import {CommunicationsState, Writer} from "../../../types";

describe("command reducer", () => {
    it("has initial state", () => {
        const commandState = commandReducer(undefined, {type: 'INIT'})

        expect(commandState).toEqual({logs: [], writer: null, connected: false})
    })

    it("prepends a message on ADD_COMMAND_TO_LOG", () => {
        const action = addCommandToLog({kind: "sent", message: "<test>"})
        const commandState = commandReducer(undefined, action)

        expect(commandState).toEqual({
            logs: [{
                kind: "sent",
                message: "<test>",
                timestamps: {createdAt: expect.any(Number)}
            }], writer: null, connected: false
        })
    })

    it("writes to the writer on COMMAND_WRITE", () => {
        const mockedWrite = jest.fn();
        const mockedWriter: Writer = {
            abort(reason: any): Promise<void> {
                return Promise.resolve(undefined);
            },
            close(): Promise<void> {
                return Promise.resolve(undefined);
            },
            closed: Promise.resolve(undefined),
            desiredSize: null,
            ready: Promise.resolve(undefined),
            releaseLock(): void {
            },
            write: mockedWrite
        }

        const action = commandWrite("<test>")
        commandReducer({connected: true, logs: [], writer: mockedWriter}, action)

        // The mock function was called at least once with the specified args
        expect(mockedWrite).toHaveBeenCalledWith("<test>");
    })

    it("resets all state on USER_RESET_STATE", () => {
        const action = userResetState()
        const preActionState: CommunicationsState = {
            logs: [{
                kind: "sent",
                message: "<test>",
                timestamps: {createdAt: expect.any(Number)}
            }], writer: null, connected: false
        }
        const commandState = commandReducer(preActionState, action)

        expect(commandState).toEqual({logs: [], writer: null, connected: false})
    })
})
