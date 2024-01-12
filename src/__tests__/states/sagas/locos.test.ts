import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {addOrUpdateLoco, newLocoFormSubmit} from "../../../states/actions/locos";

describe("User adds a new Loco", () => {
    describe("NEW_LOCO_FORM_SUBMIT", () => {
        it("puts ADD_OR_UPDATE_LOCO", () => {
            return expectSaga(commandSaga)
                .put(addOrUpdateLoco({cabId: 1, name: 'test'}))
                .dispatch(newLocoFormSubmit({cabId: 1, name: 'test'}))
                .silentRun();
        });
    });
})
