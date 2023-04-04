<template>
  <v-card class="mx-auto" max-width="auto" min-height="400">
    <v-card-item
      :title="
        device.describe + (device.status ? ' - ' + device.message : ' - 已关闭')
      "
    >
      <template v-slot:subtitle>
        <v-icon
          icon="mdi-hydraulic-oil-temperature"
          size="18"
          color="info"
        ></v-icon>
        ID: {{ device.id }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-list-item density="compact">
        <v-row justify="center">
          <v-col>
            <v-switch
              color="primary"
              class="ml-4"
              rounded
              :label="device.status ? '开' : '关'"
              v-model="device.status"
              @click="changeStatus"
            ></v-switch>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item density="compact" v-if="device.status">
        <v-row class="text-center">
          <v-col cols="6" class="text-h5"> {{ device.value / 10 }} </v-col>
          <v-col clos="6" class="text-h5">
            <v-icon icon="mdi-temperature-celsius"> </v-icon>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col class="text-h5"> {{ device.value2 / 10 }} </v-col>
          <v-col class="text-h5">
            <v-icon icon="mdi-water-percent"> </v-icon>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col class="text-h5"> {{ device.value3 / 10 }} </v-col>
          <v-col class="text-h5"> PM2.5 </v-col>
        </v-row>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "deviceCard",
};
</script>
<script setup lang="ts">
import { ref, provide } from "vue";
import bus from "@/utils/bus";

import { Device } from "@/api/types";
import { toRefs } from "vue";
const props = defineProps<{
  device: Device;
}>();

const { device } = toRefs(props);
const changeStatus = () => {
  // 切换电源状态的方法

  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 0,
    value: !device.value.status,
  });
};
</script>

<style scoped lang="less"></style>
