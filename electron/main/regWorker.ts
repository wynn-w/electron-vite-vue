import path from "node:path";

import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export function regWokers() {
  const worker = new Worker(path.resolve(__dirname, "./hid.worker.js"));
  worker.on("message", (message) => {
    console.log(
      "++++++++++++++++++++++++++++++++++++ Received message from hid:",
      "\n",
      message,
      "\n ++++++++++++++++++++++++++++++++++++ end \n"
    );
    // 注册ipc
    
  });
  // setTimeout(() => {
  //   worker.postMessage({
  //     evtName: "getDevice",
  //   });
  // }, 1000);
}
