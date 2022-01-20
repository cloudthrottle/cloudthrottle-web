import {HandleSubmit} from "../../types";
import React from "react";

export function FakeReadCommsForm(props: { onSubmit: HandleSubmit }) {
    return (
        <div>
            <h3>Fake Read</h3>
            <p><small>Simulates commands sent from the CS</small></p>
            <form action="/communications/fake_read" method="post" onSubmit={props.onSubmit}>
                <input type="text" name="command" autoComplete="none"/>
                <button type="submit">Fake Read</button>
            </form>
        </div>
    )
}