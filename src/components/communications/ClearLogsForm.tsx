import {useDispatch} from "react-redux";
import React, {FormEvent} from "react";
import {userClearCommunicationLogs} from "../../states/actions/communications";

export const ClearLogsForm = () => {
    const dispatch = useDispatch()

    const handleClearLogs = (event: FormEvent) => {
        event.preventDefault()

        dispatch(userClearCommunicationLogs())
    }

    return (
        <form action="/communications/logs/clear" method="post" onSubmit={handleClearLogs}>
            <button type="submit">Clear Logs</button>
        </form>
    );
}
