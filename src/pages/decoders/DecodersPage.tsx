import React from "react"
import {ReadForm} from "../../components";

export const DecodersPage = () => {
    return (
        <div>
            <h2>Decoders</h2>

            <div className="container">
                <div style={{display: "flex", gap: "1rem", alignItems: "baseline"}}>
                    <ReadForm/>
                    <p><small>No last read address</small></p>

                </div>
            </div>
        </div>
    )
}
