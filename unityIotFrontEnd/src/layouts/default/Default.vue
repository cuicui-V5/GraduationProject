<template>
  <v-app>
    <default-bar />
    <drawer />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import drawer from "./drawer.vue";
</script>
