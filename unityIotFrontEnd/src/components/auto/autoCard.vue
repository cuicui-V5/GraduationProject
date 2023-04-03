<template>
  <v-card hover elevation="12" rounded>
    <template v-slot:title> {{ trigger.name }} </template>

    <template v-slot:subtitle>
      <v-icon
        :color="trigger.enabled ? 'success' : 'error'"
        :icon="trigger.enabled ? 'mdi-check-circle' : 'mdi-minus-circle'"
      ></v-icon>
      {{ trigger.enabled ? "已启用" : "已禁用" }}
      <v-icon
        :color="trigger.met ? 'success' : 'error'"
        :icon="trigger.met ? 'mdi-check-circle' : 'mdi-minus-circle'"
      ></v-icon>
      {{ trigger.met ? "已触发" : "未触发" }}
    </template>

    <template v-slot:text>
      <v-row>
        <v-col class="font-weight-bold" cols="12"
          >{{
            trigger.condition.mode == "and"
              ? "以下条件同时满足:"
              : "以下条件任一满足:"
          }}
        </v-col>
      </v-row>

      <v-container grid-list-xs>
        <v-row
          v-for="condition in trigger.condition.conditions"
          :key="condition.id"
        >
          <v-col cols="12">
            <v-card
              variant="outlined"
              rounded
              hover
              :color="condition.met ? '#94cf96' : ''"
            >
              <template v-slot:text>
                <v-row>
                  <v-col cols="10">
                    {{ computeConditionTitle(condition) }}
                  </v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon
                      :color="condition.met ? 'success' : 'error'"
                      :icon="
                        condition.met ? 'mdi-check-circle' : 'mdi-minus-circle'
                      "
                    ></v-icon>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-divider></v-divider>
        </v-row>
      </v-container>
      <v-row>
        <v-col class="font-weight-bold" cols="12"> 执行如下操作: </v-col>
      </v-row>

      <v-container grid-list-xs>
        <v-row v-for="action in trigger.actions" :key="action.id">
          <v-col cols="12">
            <v-card
              variant="outlined"
              rounded
              hover
              :color="trigger.met ? '#94cf96' : ''"
            >
              <template v-slot:text>
                <v-row>
                  <v-col cols="12"> {{ computeActionTitle(action) }} </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
    </template>
    <v-card-actions>
      <v-btn>禁用</v-btn>
      <v-btn>编辑</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "",
};
</script>
<script setup lang="ts">
import { actionType, conditionType, triggerType } from "@/automation/types";
import { Stats } from "fs";
import { computed } from "vue";
import { toRefs } from "vue";
import { ref } from "vue";

const props = defineProps<{
  trigger: triggerType;
}>();
const { trigger } = toRefs(props);
const computeConditionTitle = computed(() => (condition: conditionType) => {
  if (condition.type == 1) {
    const hour = Math.floor((condition.value as number) / 60);
    const minutes = Math.floor((condition.value as number) % 60);
    const time = `${hour}:${minutes}`;
    if (condition.compare == 2) {
      const hour2 = Math.floor((condition.value2 as number) / 60);
      const minutes2 = Math.floor((condition.value2 as number) % 60);
      const time2 = `${hour2}:${minutes2}`;
      return `当 时间 在 ${time} 和 ${time2} 之间`;
    } else if (condition.compare == -1) {
      return `当 时间 在 ${time} 之前`;
    } else if (condition.compare == 0) {
      return `当 时间 为 ${time}`;
    } else if (condition.compare == 1) {
      return `当 时间 在 ${time} 之后`;
    }
  } else {
    const deviceName = condition.deviceName;
    const deviceID = condition.deviceID;
    let status = "运行状态";
    switch (condition.valueType) {
      case 0:
        break;
      case 1:
        if (condition.deviceType == "fan") {
          status = "风速";
        } else if (condition.deviceType == "light") {
          status = "亮度";
        } else if (condition.deviceType == "tv") {
          status = "音量";
        } else if (condition.deviceType == "sensor") {
          status = "温度";
        } else {
          status = "value";
        }

        break;
      case 2:
        if (condition.deviceType == "fan") {
          status = "模式";
        } else if (condition.deviceType == "tv") {
          status = "频道";
        } else if (condition.deviceType == "sensor") {
          status = "湿度";
        } else {
          status = "value2";
        }
        break;
      case 3:
        if (condition.deviceType == "sensor") {
          status = "pm2.5";
        } else {
          status = "value3";
        }
        break;
      case 4:
        if (condition.deviceType == "light") {
          status = "颜色";
        } else {
          status = "value3";
        }
        break;
      default:
        break;
    }
    if (condition.compare == 2) {
      return `当 ${deviceName} (ID${deviceID}) 的${status} 在 ${condition.value} 和 ${condition.value2} 之间`;
    } else if (condition.compare == -1) {
      return `当 ${deviceName} (ID${deviceID}) 的${status} 小于 ${condition.value}`;
    } else if (condition.compare == 0) {
      return `当 ${deviceName} (ID${deviceID}) 的${status} 为 ${condition.value}`;
    } else if (condition.compare == 1) {
      return `当 ${deviceName} (ID${deviceID}) 的${status} 大于 ${condition.value}`;
    }
  }
});
const computeActionTitle = computed(() => (action: actionType) => {
  const deviceName = action.deviceName;
  const deviceID = action.deviceID;
  let status = "运行状态";
  switch (action.valueType) {
    case 0:
      break;
    case 1:
      if (action.deviceType == "fan") {
        status = "风速";
      } else if (action.deviceType == "light") {
        status = "亮度";
      } else if (action.deviceType == "tv") {
        status = "音量";
      } else if (action.deviceType == "sensor") {
        status = "温度";
      } else {
        status = "value";
      }

      break;
    case 2:
      if (action.deviceType == "fan") {
        status = "模式";
      } else if (action.deviceType == "tv") {
        status = "频道";
      } else if (action.deviceType == "sensor") {
        status = "湿度";
      } else {
        status = "value2";
      }
      break;
    case 3:
      if (action.deviceType == "sensor") {
        status = "pm2.5";
      } else {
        status = "value3";
      }
      break;
    case 4:
      if (action.deviceType == "light") {
        status = "颜色";
      } else {
        status = "value3";
      }
      break;
    default:
      break;
  }
  return `将 ${deviceName} (ID${deviceID}) 的 ${status} 设置为 ${action.value}`;
});
</script>

<style scoped lang="less"></style>
