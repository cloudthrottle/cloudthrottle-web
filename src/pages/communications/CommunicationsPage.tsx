import React from "react"
import {Route, Routes} from "react-router-dom"
import {CommunicationsIndex} from "./index/CommunicationsIndex";
import {CommunicationsForm} from "./form/CommunicationsForm";
import {Paths} from "../../types";
import {ActiveLink} from "../../components";

export const CommunicationsPage = () => {
    return (
        <div>
            <h2>Comms</h2>
            <nav>
                <ActiveLink to={Paths.INDEX} key={"communications"}>Log</ActiveLink>
                <ActiveLink to={Paths.NEW} key={"communicationsSend"}>Send Comms</ActiveLink>
            </nav>

            <Routes>
                <Route index element={<CommunicationsIndex/>}/>
                <Route path={Paths.NEW} element={<CommunicationsForm/>}/>
            </Routes>
        </div>
    )
}
