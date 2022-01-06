import React, {FormEvent, useState} from 'react';
import './App.css';
import {createSerialConnection, ReadHandler} from "../../services";
import {Link, Route, Routes} from "react-router-dom";
import {Communications, CommunicationsProps, Locos, LocosProps} from "../../pages";
import {HandleSubmit} from "../../utils";

export const App = () => {
    const [writer, setWriter] = useState<WritableStreamDefaultWriter<string> | null>(null)
    const [readLog, setReadLog] = useState<string[]>([])

    const handleCommandSendSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleCommandSendSubmit")
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
            const {writer} = await createSerialConnection({readHandler: handleRead});
            setWriter(writer)
        }
    }

    const handleRead: ReadHandler = (value) => {
        console.debug("READ: ", value)
        setReadLog(prevState => [value, ...prevState])
    }

    const handleNewLocoSubmit: HandleSubmit = async (event: FormEvent) => {
        console.debug("handleNewLocoSubmit")
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const name = formData.get('name')
        console.log(name);
        return
    }

    const communicationsProps: CommunicationsProps = {
        handleCommandSendSubmit,
        readLog
    }

    const locosProps: LocosProps = {
        locos: [],
        handleNewLocoSubmit
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

            <nav>
                <Link to="/locos">Locos</Link>
                <Link to="/communications">Comms</Link>
            </nav>

            <Routes>
                <Route path="/communications/*" element={<Communications {...communicationsProps}/>}/>
                <Route path="/locos/*" element={<Locos {...locosProps}/>}/>
            </Routes>
        </div>
    )
}

export type SendCommsFormProps = {
    handleCommandSendSubmit: HandleSubmit
}

export const SendCommsForm = ({handleCommandSendSubmit}: SendCommsFormProps) => {
    return (<div>
        <h3>Send Comms</h3>
        <form action="/communications/send" method="post" onSubmit={handleCommandSendSubmit}>
            <input type="text" name="command"/>
            <button type="submit">Send</button>
        </form>
    </div>)
}