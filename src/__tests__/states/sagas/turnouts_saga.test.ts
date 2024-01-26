import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {commandReceived, commandSend} from "../../../states/actions/commands";
import {addOrUpdateTurnout, newTurnoutFormSubmit, userPopulateTurnouts} from "../../../states/actions/turnouts";
import {TurnoutPosition} from "../../../types";

describe("User adds a new Turnout", () => {
    describe("NEW_TURNOUT_FORM_SUBMIT", () => {
        it("puts ADD_OR_UPDATE_TURNOUT", () => {
            return expectSaga(commandSaga)
                .dispatch(newTurnoutFormSubmit({id: 70, address: 10}))
                .put(addOrUpdateTurnout({id: 70, address: 10})) // tested by Turnouts reducer
                .silentRun();
        });
    });
})

describe("User populates Turnouts from Roster", () => {
    describe("USER_POPULATE_TURNOUTS", () => {
        it("puts COMMAND_SEND <JT>", () => {
            return expectSaga(commandSaga)
                .dispatch(userPopulateTurnouts())
                .put(commandSend("<JT>"))
                .silentRun()
        })
    })
})

describe("Turnout list received", () => {
    describe("<jT 1 22 333 4444> command received", () => {
        it("puts many Turnout Item commands", () => {
            return expectSaga(commandSaga)
                .dispatch(commandReceived("<jT 1 22 333 4444>"))
                .put(commandSend("<JT 1>"))
                .put(commandSend("<JT 22>"))
                .put(commandSend("<JT 333>"))
                .put(commandSend("<JT 4444>")) // these commands should trigger a FunctionName.TURNOUT_ITEM response
                .silentRun()
        })
    })
})

describe("Adding a Turnout from parsed roster command", () => {
    describe("TURNOUT_ITEM_COMMAND_PARSED", () => {
        it("puts ADD_OR_UPDATE_TURNOUT", () => {
            return expectSaga(commandSaga)
                .dispatch(commandReceived('<jT 70 1 "Description">'))
                .put(addOrUpdateTurnout({
                    id: 70,
                    position: TurnoutPosition.THROWN,
                })) // tested by Turnouts reducer
                .silentRun()
        })
    })
})
