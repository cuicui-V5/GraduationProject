<template>
  <v-card class="mx-auto" max-width="auto" min-height="400">
    <v-card-item
      :title="
        device.describe +
        (device.status ? ' - 正在播放:' + device.message : ' - 已关闭')
      "
    >
      <template v-slot:subtitle>
        <v-icon icon="mdi-television" size="18" color="info"></v-icon>
        ID: {{ device.id }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-responsive>
          <v-img
            width="100%"
            height="200"
            aspect-ratio="16/9"
            cover
            :src="coverImg[channel - 1]"
          ></v-img>
        </v-responsive>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-order-numeric-ascending">
        <v-list-item-subtitle>{{ device.value2 }} 频道</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-volume-high">
        <v-list-item-subtitle>{{ device.value }}% 音量</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <v-list-item density="compact" title="电源">
          <v-switch
            color="primary"
            class="ml-4"
            rounded
            :label="device.status ? '开' : '关'"
            v-model="device.status"
            @click="changeStatus"
          ></v-switch>
        </v-list-item>
        <v-list-item density="compact" title="音量">
          <v-slider
            class="ml-4"
            rounded
            thumb-label
            min="0"
            max="100"
            step="1"
            v-model="volume"
            @update:modelValue="changeVolume"
          >
            <template v-slot:append>
              <v-text-field
                v-model="volume"
                hide-details
                single-line
                density="compact"
                style="width: 70px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <v-list-item density="compact" title="频道">
          <v-text-field readonly v-model="channel">
            <template v-slot:prepend>
              <v-btn @click="changeChannel(-1)">
                <v-icon icon="mdi-minus" />
              </v-btn>
            </template>
            <template v-slot:append>
              <v-btn @click="changeChannel(+1)">
                <v-icon icon="mdi-plus" />
              </v-btn>
            </template>
          </v-text-field>
        </v-list-item>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="expand = !expand">
        {{ !expand ? "选项" : "隐藏" }}
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
import { Ref } from "vue";
import { ref } from "vue";
import { toRefs } from "vue";
const expand = ref(null) as Ref<null | boolean>;
const props = defineProps<{
  device: Device;
}>();

const { device } = toRefs(props);
const volume = ref(50);
const channel = ref(1);
const coverImg = ref([
  "/tvChannel/c1.jpg",
  "/tvChannel/c2.jpg",
  "/tvChannel/c3.jpg",
]);
const changeStatus = () => {
  // 切换电源状态的方法

  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 0,
    value: !device.value.status,
  });
};
const changeVolume = debounce(() => {
  // 改变音量的方法
  console.log("changeVolume");

  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 1,
    value: volume.value,
  });
}, 200);

const changeChannel = (val: number) => {
  channel.value += val;
  if (channel.value > 3 || channel.value < 1) {
    channel.value = 1;
  }
  bus.emit("CtrlMsg", {
    id: device.value.id,
    type: 2,
    value: channel.value,
  });
};
</script>

<style scoped lang="less"></style>
