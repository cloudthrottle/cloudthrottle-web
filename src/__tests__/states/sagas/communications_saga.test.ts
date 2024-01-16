import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {
    addCommandToLog,
    commandParsedFailed,
    commandReceived,
    commandSend,
    commandWrite
} from "../../../states/actions/commands";

describe("User sends a message manually", () => {
    describe("COMMAND_SEND", () => {
        it("puts ADD_COMMAND_TO_LOG and COMMAND_WRITE", () => {
            return expectSaga(commandSaga)
                .dispatch(commandSend("<test>"))
                .put(addCommandToLog({kind: "sent", message: "<test>"}))
                .put(commandWrite("<test>"))
                .silentRun();
        });
    })
})

describe("User fakes a read manually", () => {
    describe("COMMAND_RECEIVED", () => {
        it("puts ADD_COMMAND_TO_LOG and COMMAND_PARSED_FAILED", () => {
            return expectSaga(commandSaga)
                .dispatch(commandReceived("<test>"))
                .put(addCommandToLog({kind: "received", message: "<test>"}))
                .put(commandParsedFailed())
                .silentRun();
        });
    })
})
