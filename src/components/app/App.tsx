import React, {FormEvent} from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {CommunicationsPage, LocosPage, ThrottlesPage} from "../../pages";
import {RootState, setWriter} from "../../states";
import {createSerialConnection} from "@cloudthrottle/dcc-ex--serial-communicator";
import {useDispatch, useSelector} from "react-redux";
import {readHandler} from "../../utils";
import {setCommunicationsWriter} from "../../states/actions";

export const App = () => {
    const dispatch = useDispatch()
    const {connected} = useSelector((state: RootState) => state.communications)
    const handleRead = readHandler(dispatch);

    const handleConnectionRequestSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const {writer} = await createSerialConnection({readHandler: handleRead});
            dispatch(setCommunicationsWriter(writer))
        } catch (e) {
            console.debug(e)
            return
        }
    }

    return (
        <>
            <header>
                <h1>Cloud Throttle {connected ? "🟢" : "🔴"}</h1>
                <div className="nav-bar">
                    <nav>
                        <Link to="/communications">Comms</Link>
                        <Link to="/locos">Locos</Link>
                        <Link to="/throttles">Throttles</Link>
                    </nav>
                    <form action="/communications/connect" method="post" onSubmit={handleConnectionRequestSubmit}>
                        <button type="submit">Connect</button>
                    </form>
                </div>
            </header>

            <Routes>
                <Route path="/communications/*" element={<CommunicationsPage/>}/>
                <Route path="/locos/*" element={<LocosPage/>}/>
                <Route path="/throttles/*" element={<ThrottlesPage/>}/>
            </Routes>
        </>
    )
}
