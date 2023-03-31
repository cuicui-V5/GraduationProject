<template>
  <template v-if="device.type == 'tv'">
    <tvCard :device="device"></tvCard>
  </template>
  <template v-if="device.type == 'fan'">
    <fanCard :device="device"></fanCard>
  </template>
  <template v-if="device.type == 'light'">
    <lightCard :device="device"></lightCard>
  </template>
  <template v-if="device.type == 'cam'">
    <camCard :device="device"></camCard>
  </template>
  <template v-if="device.type == 'sensor'">
    <sensorCard :device="device"></sensorCard>
  </template>
</template>

<script lang="ts">
export default {
  name: "",
};
</script>
<script setup lang="ts">
import { Device } from "@/api/types";
import { toRefs } from "vue";
import tvCard from "./deviceCard/tvCard.vue";
import fanCard from "./deviceCard/fanCard.vue";
import lightCard from "./deviceCard/lightCard.vue";
import camCard from "./deviceCard/camCard.vue";
import sensorCard from "./deviceCard/sensorCard.vue";

const props = defineProps<{
  device: Device;
}>();

const { device } = toRefs(props);
</script>

<style scoped lang="less"></style>
