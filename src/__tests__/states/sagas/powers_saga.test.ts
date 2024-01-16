import {FunctionName, ParserStatus, ReturnTrack} from "@cloudthrottle/dcc-ex--commands";
import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {commandReceived, commandSend, powerCommandParsed} from "../../../states/actions/commands";
import {updatePowerState, userChangedPower} from "../../../states/actions/powers";

describe("User requests a power change", () => {
    describe("USER_CHANGED_POWER", () => {
        it("puts UPDATE_POWER_STATE and COMMAND_SEND", () => {
            return expectSaga(commandSaga)
                .dispatch(userChangedPower(1))
                .put(updatePowerState(1)) // tested by powers reducer
                .put(commandSend('<1>')) // tested by communications saga
                .silentRun();
        });
    })
})


describe("Power response received", () => {
    describe("COMMAND_RECEIVED '<p1 MAIN>'", () => {
        it("puts POWER_COMMAND_PARSED and UPDATE_POWER_STATE", () => {
            const parsedPowerCommand = {
                key: "p",
                params: {power: 1, track: ReturnTrack.MAIN},
                parser: FunctionName.POWER,
                status: ParserStatus.SUCCESS
            };
            return expectSaga(commandSaga)
                .dispatch(commandReceived("<p1 MAIN>"))
                .put(powerCommandParsed(parsedPowerCommand))
                .put(updatePowerState(1)) // tested by powers reducer
                .silentRun();
        });
    });
})
