import React, {FormEvent} from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {Communications, Locos, Throttles} from "../../pages";
import {HandleSubmit, prependLogItem} from "../../utils";
import {useGlobalContext} from "../../contexts";
import {CommunicationsState, LogItem} from "../../types";
import {createSerialConnection, ReadHandler} from "@cloudthrottle/dcc-ex--serial-communicator";

export const App = () => {
    const [, setGlobalState] = useGlobalContext();

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
        const log: LogItem = {
            message: value,
            kind: "received"
        }
        prependLogItem(setGlobalState, log);
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
                <Link to="/throttles">Throttles</Link>
            </nav>

            <Routes>
                <Route path="/communications/*" element={<Communications/>}/>
                <Route path="/locos/*" element={<Locos/>}/>
                <Route path="/throttles/*" element={<Throttles/>}/>
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