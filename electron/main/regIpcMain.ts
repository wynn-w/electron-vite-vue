import { screen, ipcMain, BrowserWindow, Dialog, dialog } from "electron";
export function windowMove() {
  let winStartPosition = { x: 0, y: 0 };
  let mouseStartPosition = { x: 0, y: 0 };
  let movingInterval = null;
  const lastPostion = {
    x: -1,
    y: -1,
  };
  /**
   * 窗口移动事件
   */
  ipcMain.on("window:move-open", (events, canMoving) => {
    const win = BrowserWindow.fromWebContents(events.sender);
    if (canMoving) {
      // get orgin position and size(keep)
      const winPosition = win.getPosition();
      const winSize = win.getSize() as [number, number];

      winStartPosition = { x: winPosition[0], y: winPosition[1] };
      mouseStartPosition = screen.getCursorScreenPoint();

      // 清除
      if (movingInterval) {
        clearInterval(movingInterval);
      }
      //
      movingInterval = setInterval(() => {
        // update window position
        const cursorPosition = screen.getCursorScreenPoint();
        // reduce calc
        if (
          lastPostion.x === cursorPosition.x &&
          lastPostion.y === cursorPosition.y
        ) {
          return;
        }
        lastPostion.x = cursorPosition.x;
        lastPostion.y = cursorPosition.y;

        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;

        win.setPosition(x, y, true);
        win.setContentSize(...winSize);
      }, 10);
    } else {
      clearInterval(movingInterval);
      movingInterval = null;
    }
  });
}
export function customTitleBarAction() {
  ipcMain.on("window:min", (events) => {
    const win = BrowserWindow.fromWebContents(events.sender);

    win.minimize();
  });
  ipcMain.on("window:max", (events) => {
    const win = BrowserWindow.fromWebContents(events.sender);

    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("window:close", async (events) => {
    events.preventDefault();
    const win = BrowserWindow.fromWebContents(events.sender);
    win.close();
  });
}
export function regIpcMainEvent() {
  // drag window
  windowMove();

  customTitleBarAction();
}
