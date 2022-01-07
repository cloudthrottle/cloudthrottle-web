import React from "react"
import {Link, Route, Routes} from "react-router-dom"
import {HandleSubmit} from "../../utils";

export type LocosProps = LocoListProps & NewLocoFormProps

export const Locos = ({locos, handleNewLocoSubmit}: LocosProps) => {
    return (
        <div>
            <h2>Locos</h2>
            <nav>
                <Link to={`/locos`} key={"locos"}>Locos</Link>
                <Link to={`/locos/new`} key={"locosNew"}>Add Loco</Link>
            </nav>

            <Routes>
                <Route index element={<LocosList locos={locos}/>}/>
                <Route path="new" element={<NewLocoForm handleNewLocoSubmit={handleNewLocoSubmit}/>}/>
            </Routes>
        </div>
    )
}

interface LocoListProps {
    locos: string[]
}

export const LocosList = ({locos}: LocoListProps) => {
    return (
        <div>
            <ul>
                {locos.map((loco, index) => <li key={index}>{loco}</li>)}
            </ul>
        </div>
    )
}

interface NewLocoFormProps {
    handleNewLocoSubmit: HandleSubmit
}

export const NewLocoForm = ({handleNewLocoSubmit}: NewLocoFormProps) => {
    return (
        <div>
            <h2>New Loco</h2>
            <form action="locos/new" method="post" onSubmit={handleNewLocoSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name"/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Locos
