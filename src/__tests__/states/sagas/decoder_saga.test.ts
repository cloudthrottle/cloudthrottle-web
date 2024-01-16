import {expectSaga} from "redux-saga-test-plan";
import commandSaga from "../../../states/actions";
import {
    createDecoderReadAddressCommand,
    decoderReadAddressCommandParsed,
    updateLastReadAddressState,
    userDecoderReadAddress
} from "../../../states/actions/decoders";
import {commandReceived, commandSend} from "../../../states/actions/commands";
import {FunctionName, ParserStatus} from "@cloudthrottle/dcc-ex--commands";

describe("User requests a decoder read", () => {
    describe("USER_DECODER_READ_ADDRESS", () => {
        it("puts CREATE_DECODER_READ_ADDRESS_COMMAND and COMMAND_SEND", () => {
            return expectSaga(commandSaga)
                .dispatch(userDecoderReadAddress())
                .put(createDecoderReadAddressCommand())
                .put(commandSend('<R>')) // tested by communications saga
                .silentRun();
        });
    });
})

describe("Decoder read response received", () => {
    describe("COMMAND_RECEIVED '<r 3>'", () => {
        it("puts DECODER_READ_ADDRESS_COMMAND_PARSED and UPDATE_LAST_READ_ADDRESS_STATE", () => {
            const parsedDecoderAddressCommand = {
                key: "r",
                params: {address: 3},
                parser: FunctionName.DECODER_ADDRESS,
                status: ParserStatus.SUCCESS
            };
            return expectSaga(commandSaga)
                .dispatch(commandReceived("<r 3>"))
                .put(decoderReadAddressCommandParsed(parsedDecoderAddressCommand))
                .put(updateLastReadAddressState(3)) // tested by decoders reducer
                .silentRun();
        });
    });
})
