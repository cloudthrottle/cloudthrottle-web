import React from "react"
import {Link, Route, Routes} from "react-router-dom"
import {CommunicationsIndex} from "./index/CommunicationsIndex";
import {CommunicationsForm} from "./form/CommunicationsForm";
import {Paths} from "../../types";

export const CommunicationsPage = () => {
    return (
        <div>
            <h2>Comms</h2>
            <nav>
                <Link to={Paths.INDEX} key={"communications"}>Log</Link>
                <Link to={Paths.NEW} key={"communicationsSend"}>Send Comms</Link>
            </nav>

            <Routes>
                <Route index element={<CommunicationsIndex/>}/>
                <Route path={Paths.NEW} element={<CommunicationsForm/>}/>
            </Routes>
        </div>
    )
}