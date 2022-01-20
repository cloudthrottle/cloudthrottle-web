import React from "react"
import {Powers, Throttles} from "../../components";

export const ThrottlesPage = () => {
    return (
        <div>
            <h2>Throttles</h2>

            <div className="container">
                <Powers/>
                <Throttles/>
            </div>
        </div>
    )
}
