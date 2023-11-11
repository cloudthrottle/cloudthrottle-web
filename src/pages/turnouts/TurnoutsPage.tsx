import React from "react"
import {Route, Routes} from "react-router-dom"
import {TurnoutsIndex} from "./index/TurnoutsIndex";
import {TurnoutsForm} from "./form/TurnoutsForm";
import {Paths} from "../../types";
import {ActiveLink} from "../../components";

export const TurnoutsPage = () => {
    return (
        <div>
            <h2>Turnouts</h2>
            <nav>
                <ActiveLink to={Paths.INDEX} key={"turnout"}>Turnouts</ActiveLink>
                <ActiveLink to={Paths.NEW} key={"turnoutNew"}>Add Turnout</ActiveLink>
            </nav>

            <Routes>
                <Route index element={<TurnoutsIndex/>}/>
                <Route path={Paths.NEW} element={<TurnoutsForm/>}/>
            </Routes>
        </div>
    )
}

export default TurnoutsPage
