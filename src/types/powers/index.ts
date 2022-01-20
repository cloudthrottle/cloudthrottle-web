import { Track } from "@cloudthrottle/dcc-ex--commands";
import {Active} from "@cloudthrottle/dcc-ex--commands/lib/types/types";

export type PowersState = {
    [key in Track]: Active
}