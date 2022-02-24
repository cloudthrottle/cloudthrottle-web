export type LogItem = {
    message: string
    kind: "sent" | "received"
    timestamps: {
        createdAt: number
    }
}

export type Logs = LogItem[]

export type Writer = WritableStreamDefaultWriter<string> | null

export type CommunicationsState = {
    writer: Writer,
    logs: Logs,
    connected: boolean
}
