<template>
  <v-dialog persistent width="1024">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            {{ props.mode }}
          </v-col>
          <v-col cols="2" class="d-flex align-center">
            <v-text-field
              density="compact"
              name="name"
              v-model="trigger.name"
              id="id"
            ></v-text-field>
          </v-col>

          <v-col cols="auto">
            <v-switch
              color="primary"
              :label="trigger.enabled ? '启用' : '禁用'"
              v-model="trigger.enabled"
            >
            </v-switch>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="auto" class="font-weight-bold"> 条件: </v-col>
          </v-row>
          <v-container>
            <v-row
              v-for="(condition, index) in trigger.condition.conditions"
              :key="index"
            >
              <v-col cols="12" sm="2">
                <v-select
                  :items="[
                    { title: '设备状态', value: 0 },
                    { title: '当前时间', value: 1 },
                  ]"
                  item-title="title"
                  item-value="value"
                  label="如果"
                  v-model.lazy="condition.type"
                  required
                >
                </v-select>
              </v-col>

              <template v-if="condition.type == 0">
                <v-col cols="12" sm="3">
                  <v-select
                    :items="deviceList"
                    item-title="describe"
                    item-value="id"
                    label="选择设备"
                    v-model="condition.deviceID"
                    required
                    @update:modelValue="
                      completeConditionDevInfo(condition.deviceID, index)
                    "
                  >
                    <template v-slot:item="{ item, props }">
                      <v-divider v-if="item.raw.type === 'divider'" />
                      <v-list-subheader
                        v-else-if="item.raw.type === 'subheader'"
                        >{{ item.title }}</v-list-subheader
                      >
                      <v-list-item
                        v-else
                        v-bind="props"
                        :disabled="item.raw.disabled"
                      />
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-select
                    :items="computeAvailableDevValue(condition.deviceType)"
                    label="状态"
                    item-title="title"
                    item-value="value"
                    v-model="condition.valueType"
                    required
                  >
                    <template v-slot:item="{ item, props }">
                      <v-list-item v-if="item.raw" v-bind="props" />
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-select
                    :items="
                      condition.valueType == 0
                        ? [{ title: '等于', value: 0 }]
                        : [
                            { title: '小于', value: -1 },
                            { title: '等于', value: 0 },
                            { title: '大于', value: 1 },
                            { title: '范围', value: 2 },
                          ]
                    "
                    item-title="title"
                    item-value="value"
                    label="比较"
                    v-model.lazy="condition.compare"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2" v-if="condition.valueType == 0">
                  <v-select
                    :items="[
                      { title: '开启', value: true },
                      { title: '关闭', value: false },
                    ]"
                    item-title="title"
                    item-value="value"
                    label="状态"
                    v-model.lazy="condition.value"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2" v-if="condition.valueType != 0">
                  <v-text-field
                    label="值"
                    v-model.lazy="condition.value"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" v-if="condition.compare == 2">
                  <v-text-field
                    label="值"
                    v-model="condition.value2"
                  ></v-text-field>
                </v-col>
              </template>
              <template v-if="condition.type == 1">
                <v-col>
                  <v-select
                    :items="[
                      { title: '小于', value: -1 },
                      { title: '等于', value: 0 },
                      { title: '大于', value: 1 },
                      { title: '范围', value: 2 },
                    ]"
                    item-title="title"
                    item-value="value"
                    label="比较"
                    v-model.lazy="condition.compare"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    type="time"
                    @update:model-value="updateTime($event, index)"
                  >
                  </v-text-field>
                </v-col>
                <v-col v-if="condition.compare == 2">
                  <v-text-field
                    type="time"
                    @update:model-value="updateTime2($event, index)"
                  >
                  </v-text-field>
                </v-col>
              </template>
              <v-col
                cols="1"
                v-if="
                  index == trigger.condition.conditions.length - 1 && index > 0
                "
              >
                <v-btn
                  icon="mdi-minus"
                  @click="trigger.condition.conditions.pop()"
                ></v-btn>
              </v-col>
              <v-col
                cols="1"
                v-if="index == trigger.condition.conditions.length - 1"
              >
                <v-btn
                  icon="mdi-plus"
                  @click="
                    trigger.condition.conditions.push({} as conditionType)
                  "
                ></v-btn>
              </v-col>
            </v-row>
          </v-container>
          <v-row v-if="trigger.condition.conditions.length > 1">
            <v-col cols="auto" class="d-flex align-center"> 以上条件 </v-col>
            <v-col cols="3" class="font-weight-bold">
              <v-select
                :items="[
                  { title: '同时满足', value: 'and' },
                  { title: '任一满足', value: 'or' },
                ]"
                v-model="trigger.condition.mode"
                item-title="title"
                item-value="value"
                density="compact"
                required
              ></v-select>
            </v-col>
            <v-col class="d-flex align-center"> 时执行 </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="font-weight-bold"> 操作: </v-col>
            <v-container>
              <v-row
                v-for="(action, index) in trigger.actions"
                :key="action.id"
              >
                <v-col cols="12" sm="3">
                  <v-select
                    :items="deviceList"
                    item-title="describe"
                    item-value="id"
                    label="选择设备"
                    v-model="action.deviceID"
                    required
                    @update:modelValue="
                      completeActionDevInfo(action.deviceID, index)
                    "
                  >
                    <template v-slot:item="{ item, props }">
                      <v-divider v-if="item.raw.type === 'divider'" />
                      <v-list-subheader
                        v-else-if="item.raw.type === 'subheader'"
                        >{{ item.title }}</v-list-subheader
                      >
                      <v-list-item
                        v-else
                        v-bind="props"
                        :disabled="item.raw.disabled"
                      />
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-select
                    :items="computeAvailableDevExecValue(action.deviceType)"
                    label="状态"
                    item-title="title"
                    item-value="value"
                    v-model="action.valueType"
                    required
                  >
                    <template v-slot:item="{ item, props }">
                      <v-list-item v-if="item.raw" v-bind="props" />
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2" v-if="action.valueType == 0">
                  <v-select
                    :items="[
                      { title: '开启', value: true },
                      { title: '关闭', value: false },
                    ]"
                    item-title="title"
                    item-value="value"
                    label="状态"
                    v-model.lazy="action.value"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2" v-if="action.valueType != 0">
                  <v-text-field
                    label="设为"
                    v-model.lazy="action.value"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="1"
                  v-if="index == trigger.actions.length - 1 && index > 0"
                >
                  <v-btn
                    icon="mdi-minus"
                    @click="trigger.actions.pop()"
                  ></v-btn>
                </v-col>
                <v-col cols="1" v-if="index == trigger.actions.length - 1">
                  <v-btn
                    icon="mdi-plus"
                    @click="trigger.actions.push({} as conditionType)"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="$emit('closeDialog')"
        >
          关闭
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="commitRule">
          保存规则
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useAppStore } from "@/store/app";
import { Device } from "@/api/types";
import { conditionType, triggerType } from "@/automation/types";
import { Ref } from "vue";
import { computed } from "vue";
import { reactive } from "vue";
import { toRefs } from "vue";

const props = defineProps<{
  mode: "edit" | "new";
  index: number;
}>();
const store = useAppStore();
let trigger = reactive({
  name: "新规则",
  enabled: true,
  id: Math.round(Math.random() * 10000),
  condition: {
    mode: "and",
    conditions: [{}],
  },
  actions: [{}],
}) as triggerType;

watch(props, () => {
  if (props.mode == "edit") {
    trigger = reactive(
      store.automationRules.triggers[props.index]
    ) as triggerType;
  } else {
    trigger = reactive({
      name: "新规则",
      enabled: true,
      id: Math.round(Math.random() * 10000),
      condition: {
        mode: "and",
        conditions: [{}],
      },
      actions: [{}],
    }) as triggerType;
  }
});
const deviceList = computed(() => {
  const res = [] as Device[];
  if (!store.homeStatus.rooms) {
    return res;
  }
  for (const room of store.homeStatus.rooms) {
    if (room.devices.length == 0) {
      continue;
    }
    res.push({
      describe: room.describe,
      type: "subheader",
    } as unknown as Device);
    room.devices.forEach((dev) => {
      dev.describe += ` (ID${dev.id})`;
    });
    res.push(...room.devices);
  }
  return res;
});

// 选择一个设备之后, 自动补全condition中的其他信息
const completeConditionDevInfo = (devID: number, index: number) => {
  const dev = getDeviceInfo(devID);
  if (!dev) {
    return;
  }
  trigger.condition.conditions[index].deviceName = dev.describe;
  trigger.condition.conditions[index].deviceType = dev.type;
  trigger.condition.conditions[index].deviceType = dev.type;
  trigger.condition.conditions[index].id = Math.round(Math.random() * 10000);
};
const completeActionDevInfo = (devID: number, index: number) => {
  const dev = getDeviceInfo(devID);
  if (!dev) {
    return;
  }
  trigger.actions[index].deviceName = dev.describe;
  trigger.actions[index].deviceType = dev.type;
  trigger.actions[index].deviceType = dev.type;
  trigger.actions[index].id = Math.round(Math.random() * 10000);
};
const getDeviceInfo = (devId: number) => {
  for (const room of store.homeStatus.rooms) {
    for (const device of room.devices) {
      if (device.id == devId) {
        return device;
      }
    }
  }
};
const computeAvailableDevValue = computed(() => (deviceType: string) => {
  switch (deviceType) {
    case "tv":
      return [
        { title: "运行状态", value: 0 },
        { title: "音量", value: 1 },
        { title: "频道", value: 2 },
      ];
    case "fan":
      return [
        { title: "运行状态", value: 0 },
        { title: "风速", value: 1 },
        { title: "模式", value: 2 },
      ];
    case "light":
      return [
        { title: "运行状态", value: 0 },
        { title: "亮度", value: 1 },
        { title: "颜色", value: 4 },
      ];
    case "cam":
      return [{ title: "运行状态", value: 0 }];
    case "sensor":
      return [
        { title: "运行状态", value: 0 },
        { title: "温度", value: 1 },
        { title: "湿度", value: 2 },
        { title: "pm2.5", value: 3 },
      ];

    default:
      return [];
  }
});
const computeAvailableDevExecValue = computed(() => (deviceType: string) => {
  switch (deviceType) {
    case "tv":
      return [
        { title: "运行状态", value: 0 },
        { title: "音量", value: 1 },
        { title: "频道", value: 2 },
      ];
    case "fan":
      return [
        { title: "运行状态", value: 0 },
        { title: "风速", value: 1 },
        { title: "模式", value: 2 },
      ];
    case "light":
      return [
        { title: "运行状态", value: 0 },
        { title: "亮度", value: 1 },
        { title: "颜色", value: 4 },
      ];
    case "cam":
      return [{ title: "运行状态", value: 0 }];
    case "sensor":
      return [{ title: "运行状态", value: 0 }];

    default:
      return [];
  }
});
const updateTime = (str: string, index: number) => {
  const timeArr = str.split(":") as unknown as number[];

  trigger.condition.conditions[index].value = timeArr[0] * 60 + timeArr[1] * 1;
};
const updateTime2 = (str: string, index: number) => {
  const timeArr = str.split(":") as unknown as number[];

  trigger.condition.conditions[index].value2 = timeArr[0] * 60 + timeArr[1] * 1;
};

const emit = defineEmits(["closeDialog"]);
const commitRule = () => {
  if (props.mode == "new") {
    store.automationRules.triggers.push(trigger);
  } else {
    store.automationRules.triggers.splice(props.index - 1, 1, trigger);
  }
  trigger = reactive({
    name: "新规则",
    enabled: true,
    id: Math.round(Math.random() * 10000),
    condition: {
      mode: "and",
      conditions: [{}],
    },
    actions: [{}],
  }) as triggerType;
  emit("closeDialog");
};
</script>
