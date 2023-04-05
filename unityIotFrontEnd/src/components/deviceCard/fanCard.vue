<template>
  <v-card class="mx-auto" max-width="auto" min-height="400">
    <v-card-item
      :title="
        device.describe + (device.status ? ' - ' + device.message : ' - 已关闭')
      "
    >
      <template v-slot:subtitle>
        <v-icon icon="mdi-fan" size="18" color="info"></v-icon>
        ID: {{ device.id }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-list-item density="compact" title="电源">
        <v-row>
          <v-col cols="6">
            <v-switch
              color="primary"
              class="ml-4"
              rounded
              :label="device.status ? '开' : '关'"
              v-model="device.status"
              @click="changeStatus"
            ></v-switch>
          </v-col>
          <v-col cols="6">
            <v-icon
              icon="mdi-fan"
              size="50"
              color="info"
              :class="{ rotate: device.status }"
              :style="{ animationDuration: 50 / speed + 's' }"
            ></v-icon>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item density="compact" title="风速">
        <v-slider
          class="ml-4"
          thumb-label
          rounded
          min="0"
          max="100"
          step="1"
          v-model="speed"
          @update:modelValue="changeSpeed"
        >
          <template v-slot:append>
            <v-text-field
              v-model="speed"
              hide-details
              single-line
              density="compact"
              style="width: 70px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>
      <v-list-item v-if="device.value4 != 'yes'">
        <v-row class="py-4">
          <v-col cols="4">
            <v-btn block :active="device.value2 == 0" @click="changeMode(0)"
              >制冷</v-btn
            >
          </v-col>
          <v-col cols="4">
            <v-btn block :active="device.value2 == 1" @click="changeMode(1)"
              >制热</v-btn
            >
          </v-col>
          <v-col cols="4">
            <v-btn block :active="device.value2 == 2" @click="changeMode(2)"
              >除湿</v-btn
            >
          </v-col>
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
import { debounce } from "lodash";
import bus from "@/utils/bus";

import { Device } from "@/api/types";
import { ref } from "vue";
import { toRefs } from "vue";
const props = defineProps<{
  device: Device;
}>();

const { device } = toRefs(props);
const speed = ref(50);
const changeStatus = () => {
  // 切换电源状态的方法

  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 0,
    value: !device.value.status,
  });
};
const changeSpeed = debounce(() => {
  // 改变风速的方法
  console.log("changespeed");
  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 1,
    value: speed.value,
  });
}, 200);
const changeMode = (mode: number) => {
  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 2,
    value: mode,
  });
};
</script>

<style scoped lang="less">
.rotate {
  animation: rotate linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
