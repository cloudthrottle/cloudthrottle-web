import {RootState} from "../../../states";
import React from "react";
import {LocosList} from "../../../components/locos";
import {useSelector} from "react-redux";

export const LocosIndex = () => {
  const locos = useSelector((state: RootState) => {
    console.log(state);
    return state.locos;
  })

  return <LocosList locos={locos}/>
}
