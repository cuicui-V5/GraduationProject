<template>
  <v-app-bar flat rounded :elevation="5" color="#f1f3f4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="changeDraw"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>{{ $route.meta.title }}</v-app-bar-title>
    <!-- <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template> -->
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
const store = useAppStore();
const changeDraw = () => {
  store.showDrawer = !store.showDrawer;
};
</script>
