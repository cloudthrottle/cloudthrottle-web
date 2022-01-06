import React from "react"
import {Link, Route, Routes} from "react-router-dom"
import {CommunicationsLogs, SendCommsForm, SendCommsFormProps} from "../../components";

export type CommunicationsProps = SendCommsFormProps & { readLog: string[] }

export const Communications = ({handleCommandSendSubmit, readLog}: CommunicationsProps) => {
    return (
        <div>
            <h2>Comms</h2>
            <nav>
                <Link to={`/communications`} key={"communications"}>Log</Link>
                <Link to={`/communications/send`} key={"communicationsSend"}>Send Comms</Link>
            </nav>

            <Routes>
                <Route index element={<CommunicationsLogs logs={readLog}/>}/>
                <Route path="send"
                       element={<SendCommsForm handleCommandSendSubmit={handleCommandSendSubmit}/>}/>
            </Routes>
        </div>
    )
}