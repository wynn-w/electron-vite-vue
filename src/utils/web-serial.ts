// export async function getSerialDeviceDefault(filters = []) {
//   // const filters = [
//   //     { usbVendorId: 0x2341, usbProductId: 0x0043 },
//   //     { usbVendorId: 0x2341, usbProductId: 0x0001 }
//   //   ]
//   let devices = await navigator.serial.requestPort({ filters });
//   console.log("serial device", devices);
//   devices.forEach((device) => {
//     console.log(`HID: ${device.productName}`);
//   });
// }
// export function getSerialPort() {
//   return new Promise((res, rej) => {
//     navigator.serial
//       .getPorts()
//       .then(async (ports) => {
//         res(ports);
//       })
//       .catch((e) => rej(e));
//   });
// }
// export function addSerialConnectListener() {
//   console.log("usb device connect listening..");
//   navigator.serial.addEventListener("connect", (e) => {
//     // Connect to `e.target` or add it to a list of available ports.
//     console.log("serial connect event", e);
//   });

//   navigator.serial.addEventListener("disconnect", (e) => {
//     // Remove `e.target` from the list of available ports.
//     console.log("serial disconnect event", e);
//   });
// }
