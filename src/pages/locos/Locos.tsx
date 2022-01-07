import React from "react"
import {Link, Route, Routes} from "react-router-dom"
import {LocosIndex} from "./index/LocosIndex";
import {LocosForm} from "./form/LocosForm";
import {Paths} from "../../types";

export const Locos = () => {
    return (
        <div>
            <h2>Locos</h2>
            <nav>
                <Link to={Paths.INDEX} key={"locos"}>Locos</Link>
                <Link to={Paths.NEW} key={"locosNew"}>Add Loco</Link>
            </nav>

            <Routes>
                <Route index element={<LocosIndex/>}/>
                <Route path={Paths.NEW} element={<LocosForm/>}/>
            </Routes>
        </div>
    )
}

export default Locos
