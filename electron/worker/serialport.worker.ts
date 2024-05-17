import { SerialPort } from "serialport";
import { Worker, parentPort } from "worker_threads";
function listSerialPorts() {
  return SerialPort.list();
}

parentPort.on("message", async ({evtName, ...rest}) => {
//   const port = new SerialPort(portName, { baudRate: 9600 });

//   port.on("open", () => {
//     console.log("Serial port is open.");
//   });

//   port.on("data", (data) => {
//     console.log("Received data from serial port:", data.toString());
//   });

//   parentPort.postMessage({ port });

    if(evtName === 'getPorts'){
        try {
            const ports =  await listSerialPorts()
            // const ports =  ['com1']
            parentPort.postMessage({ ports })
        } catch (error) {
            parentPort.postMessage({ error })
        }
    }
});
setTimeout(()=>{
    parentPort.postMessage({
        type: 'default',
        data: `worker start up..`
    })
})