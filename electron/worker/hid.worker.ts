import { devices, HIDAsync } from "node-hid";
import { Worker, parentPort } from "worker_threads";
type DeviceType = {
  active: HIDAsync | null;
};
parentPort.on("message", async ({ evtName, ...rest }) => {
  const device: DeviceType = {
    active: null,
  };

  if (evtName === "getDevice") {
    try {
      const device = await devices();
      parentPort.postMessage({ device });
    } catch (error) {
      parentPort.postMessage({ error });
    }
  } else if (evtName === "activeDevice") {
    const { pid, vid } = rest;
    try {
      device.active = await HIDAsync.open(pid, vid);
      //   trigger
      regDeviceListener(device.active);
    } catch (error) {
      throw Error(error);
    }
  } else if (evtName === "sendMessage") {
    if (!device.active) {
      throw ReferenceError("Please active device at first");
    }
    const { data } = rest;
    // use dll to 0xcc
    device.active.write(data);
  } else if (evtName === "close") {
    try {
      if (!device.active) {
        throw ReferenceError("Please active device at first");
      }
      await device.active.close();
      device.active = null;
    } catch (error) {
      throw Error(error);
    }
  }
});
function regDeviceListener(device) {
  device.on("data", function (data) {
    parentPort.postMessage({
      type: "success",
      data: data,
    });
  });
  device.on("error", function (err) {
    parentPort.postMessage({
      type: "error",
      data: err,
    });
  });
}
setTimeout(() => {
  parentPort.postMessage({
    type: "default",
    data: `hid worker start up..`,
  });
});
