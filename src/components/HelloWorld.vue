<script setup lang="ts">
import { ref } from "vue";
// import Serialport from "../demos/serialport";
// import Serialport from "@utils/serialport.ts";
// import { d } from "@utils/demo";
// import { addHidConnectListener, getHidDeviceList } from "@utils/web-hid";
// import {
//   addUsbConnectListener,
//   getUsbDeviceDefault,
//   getUsbDeviceList,
// } from "@utils/web-usb";
// import {
//   addSerialConnectListener,
//   getSerialDeviceDefault,
//   getSerialPort,
// } from "@utils/web-serial";
defineProps<{ msg: string }>();

const count = ref(0);
(async () => {
  // addHidConnectListener();
  // addUsbConnectListener();
  // addSerialConnectListener();
})();
async function handleBtnClick() {
  // const devices = await getHidDeviceList();
  // console.log("get hid devices", devices);
  // // const devices1 = await getUsbDeviceList();
  // // console.log("get usb devices", devices1);
  // getUsbDeviceDefault();
  // const devices2 =await getSerialPort();
  // console.log("get serial poer", devices2);
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <button @click="handleBtnClick">press</button>
  <!-- <div
    style="
      display: block;
      height: 50px;
      width: 50px;
      background: red;
      border-radius: 100%;
    "
  >
    1
  </div> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
