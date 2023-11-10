import {Writer} from "./communications";

export * from "./communications"
export * from "./locos"
export * from "./Paths";
export * from "./HandleSubmit"
export * from "./decoders"


declare global {
    interface Window {
        writer: Writer;
    }
}