<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-container>
      <v-row>
        <v-col>
          <v-alert
            :text="serverStatusText"
            :type="serverStatusType"
            closable
            close-label="Close Alert"
          ></v-alert>
        </v-col>
      </v-row>
      <v-container
        class="pa-4"
        v-for="room in store.homeStatus.rooms"
        :key="room.name"
      >
        <v-row>
          <v-col>
            <v-banner
              rounded
              lines="one"
              :text="room.describe + '   -   ' + room.devices.length + '设备'"
              :stacked="false"
            >
            </v-banner>
          </v-col>
        </v-row>
        <v-row align="start" justify="start">
          <v-col
            height="auto"
            cols="12"
            sm="6"
            md="3"
            v-for="device in room.devices"
            :key="device.id"
          >
            <deviceCard :device="device"></deviceCard>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-parallax>
</template>

<script lang="ts" setup>
import { enableWebsocket } from "@/api";
import deviceCard from "./deviceCard.vue";
import { useAppStore } from "@/store/app";
import { computed, ref } from "vue";
import { Ref } from "vue";
const store = useAppStore();
enableWebsocket();

const serverStatusText = computed(() => {
  if (store.connectStatus && store.homeStatus.rooms) {
    return "服务器已连接, unity已连接";
  } else if (store.connectStatus) {
    return "服务器已连接, unity未连接";
  }

  return "服务器未连接";
});
const serverStatusType = computed(() => {
  if (store.connectStatus && store.homeStatus.rooms) {
    return "success";
  } else if (store.connectStatus) {
    return "info";
  }

  return "warning";
});
</script>
