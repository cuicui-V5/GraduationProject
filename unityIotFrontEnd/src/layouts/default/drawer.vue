<template>
  <v-navigation-drawer v-model="store.showDrawer" temporary>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
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
