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
            <input type="file"/>
            <button type="submit">Import</button>
        </form>
    );
}
