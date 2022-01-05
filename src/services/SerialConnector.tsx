const selectPort: () => Promise<SerialPort> = async () => {
    return await navigator.serial.requestPort()
};
const openPort: (port: SerialPort) => Promise<SerialPort> = async (port) => {
    await port.open({baudRate: 115200})
    return port
}
export type ReadHandler = (value: string | undefined) => void;
const readFromPort: (port: SerialPort, readHandler: ReadHandler) => Promise<void> = async (port, readHandler) => {
    while (port.readable) {
        const textDecoder = new TextDecoderStream();
        port.readable.pipeTo(textDecoder.writable).then(() => {
        });
        const reader = textDecoder.readable.getReader();

        // try {
        while (true) {
            const {value, done} = await reader.read()
            if (done) {
                reader.releaseLock()
                break
            }
            readHandler(value)
        }

        // } catch (error) {
        //
        // }
    }
};
const getPortWriter: (openedPort: SerialPort) => Promise<WritableStreamDefaultWriter<string>> = async (openedPort: SerialPort) => {
    console.log("Getting port writer");
    const textEncoder = new TextEncoderStream();
    textEncoder.readable.pipeTo(openedPort.writable as WritableStream<Uint8Array>).then(() => {
    });
    return textEncoder.writable.getWriter();
};

type CreateSerialConnection = ({readHandler}: { readHandler: ReadHandler }) => Promise<WritableStreamDefaultWriter<string>>;
export const createSerialConnection: CreateSerialConnection = async ({readHandler}) => {
    const port = await selectPort()
    const openedPort = await openPort(port)

    readFromPort(openedPort, readHandler).then(() => {
    });

    return await getPortWriter(openedPort);
};