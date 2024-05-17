<script lang="ts" setup>
import { Layout } from "ant-design-vue";
async function handlerMouseup(e: Event) {
  window.ipc.send("window:move-open", false);
}
async function handlerMousedown(e: Event) {
  window.ipc.send("window:move-open", true);
}
function handleMinClick() {
  window.ipc.send("window:min", true);
}
function handleMaxClick() {
  window.ipc.send("window:max", true);
}
function handleCloseClick() {
  window.ipc.send("window:close", true);
}
</script>
<template>
  <Layout.Header
    @mouseup.left="handlerMouseup"
    @mousedown.left="handlerMousedown"
  >
    <!-- logo group-->
    <!-- menu control -->
    <!-- action group -->
    <span class="action-box" @click="handleMinClick">-</span>
    <span class="action-box" @click="handleMaxClick">口</span>
    <span class="action-box" @click="handleCloseClick">x</span>
  </Layout.Header>
</template>
<style>
.action-box {
  width: 3rem;
  height: 3rem;
  color: white;
}
</style>
