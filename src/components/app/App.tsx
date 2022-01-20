import React, {FormEvent} from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {CommunicationsPage, LocosPage, ThrottlesPage} from "../../pages";
import {addLog, RootState, setWriter} from "../../states";
import {HandleSubmit, LogItem} from "../../types";
import {createSerialConnection, ReadHandler} from "@cloudthrottle/dcc-ex--serial-communicator";
import {useDispatch, useSelector} from "react-redux";

export const App = () => {
    const dispatch = useDispatch()
    const {writer} = useSelector((state: RootState) => state.communications)

    const handleConnectionRequestSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const {target} = event
        const formData = new FormData(target as HTMLFormElement)
        const communicator = formData.get('communicator')
        if (communicator === "serial") {
            const {writer} = await createSerialConnection({readHandler: handleRead});
            dispatch(setWriter(writer))
        }
    }

    const handleRead: ReadHandler = (value) => {
        console.debug("READ: ", value)
        const log: LogItem = {
            message: value,
            kind: "received"
        }
        dispatch(addLog(log))
    }

    return (
        <div>
            <h1>Cloud Throttle {!!writer ? "🟢" : "🔴"}</h1>
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
                <Route path="/communications/*" element={<CommunicationsPage/>}/>
                <Route path="/locos/*" element={<LocosPage/>}/>
                <Route path="/throttles/*" element={<ThrottlesPage/>}/>
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
