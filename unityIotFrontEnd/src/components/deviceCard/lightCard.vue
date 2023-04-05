<template>
  <v-card class="mx-auto" max-width="auto" min-height="400">
    <v-card-item
      :title="device.describe + (device.status ? ' - 已开启' : ' - 已关闭')"
    >
      <template v-slot:subtitle>
        <v-icon icon="mdi-lightbulb" size="18" color="info"></v-icon>
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
              :icon="
                device.status ? 'mdi-lightbulb-on-90' : 'mdi-lightbulb-off'
              "
              size="50"
              :color="device.status ? device.value4 : '#7a7a7a'"
              :class="{}"
              :style="{}"
            ></v-icon>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item density="compact" title="亮度">
        <v-slider
          class="ml-4"
          rounded
          min="0"
          thumb-label
          max="100"
          step="1"
          v-model="brightness"
          @update:modelValue="changeBrightness"
        >
          <template v-slot:append>
            <v-text-field
              v-model="brightness"
              hide-details
              single-line
              density="compact"
              style="width: 70px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>
    </v-card-text>
    <v-expand-transition>
      <div v-if="expand">
        <v-list-item density="compact" title="颜色" class="pa-10">
          <v-color-picker
            width="100%"
            hide-inputs
            show-swatches
            v-model.lazy="color"
          >
          </v-color-picker>
        </v-list-item>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="expand = !expand">
        {{ !expand ? "颜色" : "隐藏" }}
      </v-btn>
    </v-card-actions>
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
const expand = ref(null) as Ref<null | boolean>;

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
watch(device, () => {
  brightness.value = device.value.value;
  color.value = device.value.value4;
});
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
