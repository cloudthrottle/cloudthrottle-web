import {HandleSubmit} from "../../types";
import React from "react";

export type SendCommsFormProps = {
    handleCommandSendSubmit: HandleSubmit
}
export const SendCommsForm = ({handleCommandSendSubmit}: SendCommsFormProps) => {
    return (
        <div>
            <h3>Send</h3>
            <p><small>Send commands directly to the CS</small></p>
            <form action="/communications/send" method="post" onSubmit={handleCommandSendSubmit}>
                <input type="text" name="command" autoComplete="none"/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}