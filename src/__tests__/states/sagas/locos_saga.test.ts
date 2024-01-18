import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {addOrUpdateLoco, newLocoFormSubmit, userPopulateRoster} from "../../../states/actions/locos";
import {commandSend} from "../../../states/actions/commands";

describe("User adds a new Loco", () => {
    describe("NEW_LOCO_FORM_SUBMIT", () => {
        it("puts ADD_OR_UPDATE_LOCO", () => {
            return expectSaga(commandSaga)
                .dispatch(newLocoFormSubmit({cabId: 1, name: 'test'}))
                .put(addOrUpdateLoco({cabId: 1, name: 'test'})) // tested by locos reducer
                .silentRun();
        });
    });
})

describe("User populates Locos from Roster", () => {
    describe("USER_POPULATE_ROSTER", () => {
        it("puts COMMAND_SEND <J>", () => {
            return expectSaga(commandSaga)
                .dispatch(userPopulateRoster())
                .put(commandSend("<J>"))
                .silentRun()
        })
    })
})
