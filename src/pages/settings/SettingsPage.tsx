import React from "react"
import {ClearLocalStorageForm, ResetStateForm, WipeForm} from "../../components";
import {ImportSettingsForm} from "../../components/settings/ImportSettingsForm";
import {useSelector} from "react-redux";
import {RootState} from "../../states";

export const SettingsPage = () => {
  const {entities} = useSelector((state: RootState) => state.buttonMaps)

  return (
    <div>
      <h2>Settings</h2>

      <div className="container">
        <div>
          <h3>Storage</h3>
          <ClearLocalStorageForm/>
          <ResetStateForm/>
          <WipeForm/>
        </div>

        <div>
          <h3>Imports</h3>
          <ImportSettingsForm/>
        </div>

        <div>
          <h3>Function Button Maps</h3>
          <ul>
            {Object.entries(entities).map(([key, buttonMap]) => {
              return <li key={key}>{buttonMap.display}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
    )
}
