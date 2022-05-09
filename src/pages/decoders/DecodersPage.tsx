import React from "react"
import {ReadForm} from "../../components";
import {useSelector} from "react-redux";
import {RootState} from "../../states";

export const DecodersPage = () => {

    return (
        <div>
            <h2>Decoders</h2>

            <div className="container">
                <div style={{display: "flex", gap: "1rem", alignItems: "baseline"}}>
                    <ReadForm/>
                    <LastReadAddress/>

                </div>
            </div>
        </div>
    )
}

const LastReadAddress = () => {
    const decoders = useSelector((state: RootState) => state.decoders)
    const [lastReadAddress] = decoders.readAddresses

    if (!lastReadAddress) {
        return (
            <p><small>No last read address</small></p>
        )
    }

    return (
        <p>Last read address: <strong>{lastReadAddress}</strong></p>
    )
}