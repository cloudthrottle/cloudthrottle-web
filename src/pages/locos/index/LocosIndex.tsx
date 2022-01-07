import {useGlobalContext} from "../../../contexts";
import React from "react";
import {LocosList} from "../../../components/locos";

export const LocosIndex = () => {
    const [{locos}] = useGlobalContext();

    return <LocosList locos={locos}/>
}