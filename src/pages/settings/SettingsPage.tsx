import React from "react"
import {ClearLocalStorageForm, ResetStateForm, WipeForm} from "../../components";

export const SettingsPage = () => {
  return (
    <div>
      <h2>Settings</h2>

      <div className="container">
        <ClearLocalStorageForm/>
        <ResetStateForm/>
        <WipeForm/>
      </div>
    </div>
  )
}
