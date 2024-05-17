import { BrowserWindow } from "electron";

export function regesiterSerialEvent(mainWindow: BrowserWindow) {
  mainWindow.webContents.session.on(
    "select-serial-port",
    (event, portList, webContents, callback) => {
      // Add listeners to handle ports being added or removed before the callback for `select-serial-port`
      // is called.
      mainWindow.webContents.session.on("serial-port-added", (event, port) => {
        console.log("serial-port-added FIRED WITH", port);
        // Optionally update portList to add the new port
      });

      mainWindow.webContents.session.on(
        "serial-port-removed",
        (event, port) => {
          console.log("serial-port-removed FIRED WITH", port);
          // Optionally update portList to remove the port
        }
      );

      event.preventDefault();
      if (portList && portList.length > 0) {
        callback(portList[0].portId);
      } else {
        // eslint-disable-next-line n/no-callback-literal
        callback(""); // Could not find any matching devices
      }
    }
  );

  mainWindow.webContents.session.setPermissionCheckHandler(
    (webContents, permission, requestingOrigin, details) => {
      if (permission === "serial" && details.securityOrigin === "file:///") {
        return true;
      }

      return false;
    }
  );

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === "serial" && details.origin === "file://") {
      return true;
    }

    return false;
  });
}
