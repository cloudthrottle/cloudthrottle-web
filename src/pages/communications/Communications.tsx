import React from "react"
import {Link, Route, Routes} from "react-router-dom"
import {SendCommsFormProps} from "../../components";
import {CommunicationsIndex} from "./index/CommunicationsIndex";
import {CommunicationsForm} from "./form/CommunicationsForm";
import {Paths} from "../../types";

export type CommunicationsProps = SendCommsFormProps

export const Communications = ({handleCommandSendSubmit}: CommunicationsProps) => {
    return (
        <div>
            <h2>Comms</h2>
            <nav>
                <Link to={Paths.INDEX} key={"communications"}>Log</Link>
                <Link to={Paths.NEW} key={"communicationsSend"}>Send Comms</Link>
            </nav>

            <Routes>
                <Route index element={<CommunicationsIndex />}/>
                <Route path={Paths.NEW}
                       element={<CommunicationsForm handleCommandSendSubmit={handleCommandSendSubmit}/>}/>
            </Routes>
        </div>
    )
}