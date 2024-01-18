import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {addOrUpdateLoco, newLocoFormSubmit, userPopulateRoster} from "../../../states/actions/locos";
import {commandSend, rosterItemCommandParsed} from "../../../states/actions/commands";
import {FunctionButtonKind, FunctionName, ParserStatus} from "@cloudthrottle/dcc-ex--commands";

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

describe("Adding a Loco from parsed roster command", () => {
    describe("ROSTER_ITEM_COMMAND_PARSED", () => {
        it("puts ADD_OR_UPDATE_LOCO", () => {
            return expectSaga(commandSaga)
                .dispatch(rosterItemCommandParsed(
                    {
                        key: 'j',
                        parser: FunctionName.ROSTER_ITEM,
                        params: {
                            cabId: 70,
                            display: 'My Loco',
                            functionButtons: {
                                1: {
                                    display: 'Ring',
                                    kind: FunctionButtonKind.PRESS
                                }
                            }
                        },
                        status: ParserStatus.SUCCESS
                    }
                ))
                .put(addOrUpdateLoco({
                    cabId: 70,
                    name: 'My Loco',
                    functionButtons: {
                        1: {
                            display: 'Ring',
                            kind: FunctionButtonKind.PRESS
                        }
                    }
                })) // tested by locos reducer
                .silentRun()
        })
    })
})
