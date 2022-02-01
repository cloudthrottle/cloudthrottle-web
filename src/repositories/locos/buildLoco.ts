import {Loco} from "../../types";
import {v4 as uuid} from "uuid";
import {buildFunctionButtons} from "./buildFunctionButtons";

export type BuildLocoParams = Partial<Loco>
type BuildLoco = (params: BuildLocoParams) => Loco
export const buildLoco: BuildLoco = (params) => {
    const defaultParams: Loco = {
        id: uuid(),
        name: "",
        cabId: 5,
        throttle: {
            speed: 0,
            direction: 1
        },
        functionButtons: buildFunctionButtons(),
        sync: {
            rosterListAt: null,
            rosterItemAt: null
        }
    }

    return {
        ...defaultParams,
        ...params
    };
}