import React from "react"
import {Link, Route, Routes} from "react-router-dom"
import {LocosIndex} from "./index/LocosIndex";
import {LocosForm} from "./form/LocosForm";

export const Locos = () => {
    return (
        <div>
            <h2>Locos</h2>
            <nav>
                <Link to={`/locos`} key={"locos"}>Locos</Link>
                <Link to={`/locos/new`} key={"locosNew"}>Add Loco</Link>
            </nav>

            <Routes>
                <Route index element={<LocosIndex/>}/>
                <Route path="new" element={<LocosForm/>}/>
            </Routes>
        </div>
    )
}

export default Locos
