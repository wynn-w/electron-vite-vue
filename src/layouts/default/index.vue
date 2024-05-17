<script lang="ts" setup>
import { Layout } from "ant-design-vue";
import xHeader from "./header/index.vue";
</script>
<template>
  <Layout>
    <Layout>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout>
        <xHeader />
        <Layout.Content>
          <RouterView />
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </Layout>
  </Layout>
</template>
