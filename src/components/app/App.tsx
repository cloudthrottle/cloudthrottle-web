import React, {FormEvent} from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {CommunicationsPage, LocosPage, ThrottlesPage} from "../../pages";
import {addLoco, addLog, RootState, setWriter} from "../../states";
import {LogItem} from "../../types";
import {createSerialConnection, ReadHandler} from "@cloudthrottle/dcc-ex--serial-communicator";
import {useDispatch, useSelector} from "react-redux";
import {genericParser, RosterItemResult} from "@cloudthrottle/dcc-ex--commands";
import {Dispatch} from "@reduxjs/toolkit";

export const readHandler = (dispatch: Dispatch<any>) => {
    const handleRead: ReadHandler = async (value) => {
        console.debug("READ: ", value)
        const log: LogItem = {
            message: value,
            kind: "received"
        }

        const parser = genericParser()
        try {
            const result = await parser.parse(value)
            if (result.parser === "rosterItemParser") {
                const {params: {display, cabId}} = result as RosterItemResult
                dispatch(addLoco({name: display, cabId}))
            }
        } finally {
            dispatch(addLog(log))
        }
    }
    return handleRead;
};

export const App = () => {
    const dispatch = useDispatch()
    const {writer} = useSelector((state: RootState) => state.communications)
    const handleRead = readHandler(dispatch);

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
