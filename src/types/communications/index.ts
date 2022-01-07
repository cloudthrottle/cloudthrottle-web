export type LogItem = {
    message: string
    kind: "sent" | "received"
}

export type Logs = LogItem[]

export type CommunicationsState = {
    writer: WritableStreamDefaultWriter<string> | null,
    logs: Logs
}