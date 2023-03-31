<template>
  <v-navigation-drawer v-model="store.showDrawer" temporary>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="概览"
        value="home"
        @click="
          $router.push({
            name: 'home',
          })
        "
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="自动化"
        value="about"
        @click="
          $router.push({
            name: 'auto',
          })
        "
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  name: "",
};
</script>
<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>

<style scoped lang="less"></style>
