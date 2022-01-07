import React, {FormEvent} from 'react';
import './App.css';
import {createSerialConnection, ReadHandler} from "../../services";
import {Link, Route, Routes} from "react-router-dom";
import {Communications, CommunicationsProps, Locos} from "../../pages";
import {HandleSubmit} from "../../utils";
import {useGlobalContext} from "../../contexts";
import {CommunicationsState} from "../../types";

export const App = () => {
    const [globalState, setGlobalState] = useGlobalContext();
    const {communications: {writer}} = globalState

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

    const handleConnectionRequestSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const communicator = formData.get('communicator')
        if (communicator === "serial") {
            const {writer} = await createSerialConnection({readHandler: handleRead});
            setGlobalState((prevState) => {
                const {communications: prevComms} = prevState
                const communications: CommunicationsState = {...prevComms, writer}
                return {...prevState, communications}
            })
        }
    }

    const handleRead: ReadHandler = (value) => {
        console.debug("READ: ", value)
        setGlobalState((prevState) => {
            const {communications: prevComms} = prevState
            const {logs: prevLogs} = prevComms
            const logs = [value, ...prevLogs]
            const communications: CommunicationsState = {...prevComms, logs}
            return {...prevState, communications}
        })
    }

    const communicationsProps: CommunicationsProps = {
        handleCommandSendSubmit,
    }

    return (
        <div>
            <h1>Cloud Throttle</h1>
            <form action="/communications/connect" method="post" onSubmit={handleConnectionRequestSubmit}>
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
                <Route path="/locos/*" element={<Locos/>}/>
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