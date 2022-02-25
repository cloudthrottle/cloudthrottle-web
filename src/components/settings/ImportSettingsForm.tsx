import {useDispatch} from "react-redux";
import React, {FormEvent} from "react";
import {userImportsSettings} from "../../states/actions/stores";

export const ImportSettingsForm = () => {
    const dispatch = useDispatch()

    const handleImportSettingsFile = async (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLFormElement
        const fileInput = target.elements[0] as HTMLInputElement
        const [file] = fileInput.files as FileList
        const text = await file.text();
        dispatch(userImportsSettings(text))

        target.reset()
    }

    return (
        <form action="/stores/import" method="post" onSubmit={handleImportSettingsFile}>
            <label htmlFor="storage-data">
                <div>Import App data from Web Throttle</div>
                <small>* you can export the App data from the Web Throttle settings page</small>
            </label>

            <input type="file" id="storage-data"/>
            <button type="submit">Import App Data</button>
        </form>
    );
}
