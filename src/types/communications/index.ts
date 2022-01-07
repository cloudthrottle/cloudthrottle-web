export type Logs = string[]
export type CommunicationsState = {
    writer: WritableStreamDefaultWriter<string> | null,
    logs: Logs
}