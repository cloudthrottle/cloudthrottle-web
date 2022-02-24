import React from "react"
import {ClearLocalStorageForm, ResetStateForm, WipeForm} from "../../components";
import {ImportSettingsForm} from "../../components/settings/ImportSettingsForm";

export const SettingsPage = () => {
    return (
        <div>
            <h2>Settings</h2>

            <div className="container">
                <ClearLocalStorageForm/>
                <ResetStateForm/>
                <WipeForm/>

                <div>
                    <ImportSettingsForm/>
                </div>
            </div>
        </div>
    )
}
