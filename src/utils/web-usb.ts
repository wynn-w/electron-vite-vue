// export async function getUsbDeviceDefault() {
//   let devices = await navigator.usb.getDevices()
//   console.log('usb device', devices)
//   devices.forEach((device) => {
//     console.log(`HID: ${device.productName}`);
//   });
// }
// export function addUsbConnectListener() {
//   console.log("usb device connect listening..");
//   window.navigator.usb.onconnect = (e) => {
//     console.log("usb connect device:", e);
//   };
// }
// export async function getUsbDeviceList() {
//   const devices = await navigator.usb.requestDevice({
//     filters: [],
//   });
//   return devices || [];
// }
