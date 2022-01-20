import React from "react"
import {EStop, Powers, Throttles} from "../../components";

export const ThrottlesPage = () => {
    return (
        <div>
            <h2>Throttles</h2>

            <div className="container">
                <div className="global-controls">
                    <Powers/>
                    <EStop/>
                </div>
                <Throttles/>
            </div>
        </div>
    )
}
