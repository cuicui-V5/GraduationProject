<template>
  <v-card class="mx-auto" max-width="auto" min-height="400">
    <v-card-item
      :title="device.describe + (device.status ? ' - 已开启' : ' - 已关闭')"
    >
      <template v-slot:subtitle>
        <v-icon icon="mdi-cctv" size="18" color="info"></v-icon>
        ID: {{ device.id }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-responsive v-if="device.status">
        <v-img
          width="auto"
          aspect-ratio="16/9"
          cover
          :src="device.value4"
        ></v-img>
      </v-responsive>
      <v-dialog v-if="device.status" v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props"> 全屏 </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <v-responsive>
              <v-img
                width="70vw"
                aspect-ratio="16/9"
                cover
                :src="device.value4"
              ></v-img>
            </v-responsive>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-list-item density="compact">
        <v-row>
          <v-col cols="6">
            <v-switch
              class="ml-4"
              rounded
              :label="device.status ? '开' : '关'"
              v-model="device.status"
              @click="changeStatus"
            ></v-switch>
          </v-col>
          <v-col cols="6">
            <v-icon
              :icon="device.status ? 'mdi-cctv' : 'mdi-cctv-off'"
              size="50"
              :color="device.status ? 'info' : '#7a7a7a'"
            ></v-icon>
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
import { Ref, ref, watch } from "vue";
import { toRefs } from "vue";
const props = defineProps<{
  device: Device;
}>();
const dialog = ref(false);

const { device } = toRefs(props);
const brightness = ref(50);
const color = ref(device.value.value4);
const changeStatus = () => {
  // 切换电源状态的方法

  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 0,
    value: !device.value.status,
  });
};
const changeBrightness = debounce(() => {
  // 改变亮度的方法
  console.log("changeBrightness");
  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 1,
    value: brightness.value,
  });
}, 200);
watch(color, () => {
  changeColor();
});
const changeColor = debounce(() => {
  // 改变颜色的方法
  console.log("changeBrightness");
  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 4,
    value: color.value,
  });
}, 200);
</script>

<style scoped lang="less"></style>
