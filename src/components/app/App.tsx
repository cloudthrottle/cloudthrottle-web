import React, {FormEvent, useState} from 'react';
import './App.css';
import {createSerialConnection, ReadHandler} from "../../services";

const handleRead: ReadHandler = (value) => {
    console.log(value)
}

export const App = () => {
    const [writer, setWriter] = useState<WritableStreamDefaultWriter<string> | null>(null)

    const handleCommandSendSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const command = formData.get('command')
        if (!writer || !command) {
            return
        }
        await writer.write(command.toString())
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const communicator = formData.get('communicator')
        if (communicator === "serial") {
            const writer = await createSerialConnection({readHandler: handleRead});
            setWriter(writer)
        }
    }

    return (
        <div>
            <h1>Cloud Throttle</h1>
            <form action="/communications/connect" method="post" onSubmit={handleSubmit}>
                <select name="communicator" id="communicator">
                    <option value="serial">Serial</option>
                </select>
                <button type="submit">Connect</button>
            </form>

            <form action="/communications/send" method="post" onSubmit={handleCommandSendSubmit}>
                <input type="text" name="command"/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}