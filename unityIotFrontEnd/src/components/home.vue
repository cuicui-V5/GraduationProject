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
      <v-row v-if="store.homeStatus.rooms">
        <v-col cols="12" lg="8" class="mx-auto">
          <v-card class="mx-auto" max-height="250">
            <v-card-item title="欢迎回家">
              <template v-slot:subtitle>
                <v-icon
                  icon="mdi-check-circle"
                  size="18"
                  color="info"
                  class="me-1 pb-1"
                ></v-icon>

                家中一切正常
              </template>
            </v-card-item>

            <v-card-text class="py-0">
              <v-row align="center" no-gutters>
                <v-col class="text-h2 text-center" cols="6">
                  <v-icon
                    color="info"
                    icon="mdi-thermometer"
                    size="88"
                  ></v-icon>

                  {{ store.homeStatus.rooms[0].temperature / 10 }}&deg;C
                </v-col>

                <v-col cols="6" class="text-h2 text-center">
                  <v-icon
                    color="info"
                    icon="mdi-clock-time-eight-outline"
                    size="88"
                  ></v-icon>
                  {{ time }}
                </v-col>
              </v-row>
            </v-card-text>

            <div class="d-flex py-3 justify-space-between">
              <v-list-item density="compact" prepend-icon="mdi-liquid-spot">
                <v-list-item-subtitle>{{
                  store.homeStatus.rooms[0].pm25 / 10
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item density="compact" prepend-icon="mdi-water-percent">
                <v-list-item-subtitle>
                  {{ store.homeStatus.rooms[0].humidity / 10 }}%
                </v-list-item-subtitle>
              </v-list-item>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-container v-for="room in store.homeStatus.rooms" :key="room.name">
        <v-row v-if="room.devices.length > 0">
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
import deviceCard from "./deviceCard.vue";
import { useAppStore } from "@/store/app";
import { computed, ref } from "vue";
import { Ref } from "vue";
const store = useAppStore();

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
const time = computed(() => {
  let hour = Math.floor(store.homeStatus.time / 60);
  let minute = Math.floor(store.homeStatus.time % 60) as number | string;
  if ((minute as number) < 10) {
    minute = "0" + minute;
  }
  return `${hour}: ${minute}`;
});
</script>
