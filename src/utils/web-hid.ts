// async function getHIDDevice(){
//     let devices = await navigator.hid.getDevices();
//     devices.forEach((device) => {
//       console.log(`HID: ${device.productName}`);
//     }); 
// }
// export function addHidConnectListener(){
//     console.log('hid device connect listening..')
//     window.navigator.hid.onconnect = (e)=>{
//         console.log("hid connect device:", e)
//     }
// }
// export async function getHidDeviceList(){
//     const devices = await navigator.hid.requestDevice({ filters: [] });
//     return devices || []
// }