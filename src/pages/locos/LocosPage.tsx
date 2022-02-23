import React from "react"
import {Route, Routes} from "react-router-dom"
import {LocosIndex} from "./index/LocosIndex";
import {LocosForm} from "./form/LocosForm";
import {Paths} from "../../types";
import {ActiveLink} from "../../components";

export const LocosPage = () => {
    return (
        <div>
            <h2>Locos</h2>
            <nav>
                <ActiveLink to={Paths.INDEX} key={"locos"}>Locos</ActiveLink>
                <ActiveLink to={Paths.NEW} key={"locosNew"}>Add Loco</ActiveLink>
            </nav>

            <Routes>
                <Route index element={<LocosIndex/>}/>
                <Route path={Paths.NEW} element={<LocosForm/>}/>
            </Routes>
        </div>
    )
}

export default LocosPage
