import { createApp } from "vue";
import App from "./App.vue";

import "./style.css";

import "./demos/ipc";
import { registerGlobComp } from "./components/registerGlobComp";
import { setupRouter } from "./router";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

async function bootstrap() {
  const app = createApp(App);

  // register 
  registerGlobComp(app);
  setupRouter(app);

  app.mount("#app").$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
}
bootstrap();
