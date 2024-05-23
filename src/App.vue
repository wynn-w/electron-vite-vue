<script setup lang="ts">
// import { Button } from "ant-design-vue";
// import HelloWorld from "./components/HelloWorld.vue";
setTimeout(() => {
  window.ipc.invoke("PING");
}, 3000);

function xxx() {
  console.log(11111111);
}
</script>

<template>
  <div
    id="header"
    style="background-color: black; width: 100%; height: 10vh"
    @click="xxx"
  >
    <div class="action-group">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
    <div
      class="action-group"
      style="background-color: bisque; width: 10rem; height: 8vh"
    >
      2222
    </div>
  </div>
  <!-- <div>
    <a href="https://www.electronjs.org/" target="_blank">
      <img
        src="./assets/electron.svg"
        class="logo electron"
        alt="Electron logo"
      />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Electron + Vite + Vue" />
  <div class="flex-center">
    <Button type="primary">press</Button>
    Place static files into the <code>/public</code> folder
    <img style="width: 2.4em; margin-left: 0.4em" src="/logo.svg" alt="Logo" />
  </div> -->
  <!-- <RouterView /> -->
</template>

<style>
#header {
  /* -webkit-app-region: "no-drag"; */
  -webkit-app-region: drag;
}
#header:hover {
}
#header:focus {
  /* -webkit-app-region: "drag"; */
}
.action-group {
  -webkit-app-region: no-drag;
}
</style>
