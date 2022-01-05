import React, {FormEvent, useState} from 'react';
import './App.css';
import {createSerialConnection, ReadHandler} from "../../services";
import {CommsLogs} from '..';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

type HandleCommandSendSubmit = (event: React.FormEvent) => Promise<void>;
export const App = () => {
    const [writer, setWriter] = useState<WritableStreamDefaultWriter<string> | null>(null)
    const [readLog, setReadLog] = useState<string[]>([])

    const handleCommandSendSubmit: HandleCommandSendSubmit = async (event: FormEvent) => {
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

    return (
        <div>
            <h1>Cloud Throttle</h1>
            <form action="/communications/connect" method="post" onSubmit={handleSubmit}>
                <select name="communicator" id="communicator">
                    <option value="serial">Serial</option>
                </select>
                <button type="submit">Connect</button>
            </form>

            <Router>
                <nav>
                    <Link to="/communications/send">Send Comms</Link>
                    <Link to="/logs">View Logs</Link>
                </nav>
                <Routes>
                    <Route path="/communications/send"
                           element={<SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>}
                    />
                    <Route path="/logs"
                           element={<CommsLogs logs={readLog}/>}
                    />
                </Routes>
            </Router>
        </div>
    )
}

type SendCommsFormProps = {
    handleCommandSendSubmit: HandleCommandSendSubmit
}

const SendCommsForm = ({handleCommandSendSubmit}: SendCommsFormProps) => {
    return (<div>
        <h3>Send Comms</h3>
        <form action="/communications/send" method="post" onSubmit={handleCommandSendSubmit}>
            <input type="text" name="command"/>
            <button type="submit">Send</button>
        </form>
    </div>)
}