// 规则执行器
import { Device } from "@/api/types";
import { conditionType } from "./types";
import { useAppStore } from "@/store/app";
import bus from "@/utils/bus";
export const executeRule = () => {
  const store = useAppStore();
  if (!store.automationRules.triggers || !store.homeStatus.rooms) {
    return;
  }
  // 遍历每一个trigger, 判断里面的条件是否符合, 从而执行对应的action
  for (const trigger of store.automationRules.triggers) {
    console.log(trigger);
    if (!trigger.enabled) {
      // 如果没启用, 就跳过
      continue;
    }
    let isMet = false; // 条件是否满足
    if (trigger.condition.mode == "and") {
      // 判断条件是否全部符合
      isMet = trigger.condition.conditions.every(checkCondition);
    } else if (trigger.condition.mode == "or") {
      // 判断是否有一个符合
      isMet = trigger.condition.conditions.some(checkCondition);
    }
    console.log("此条件" + isMet);
    trigger.met = isMet;
    if (isMet) {
      // 执行规则
      console.log("开始执行规则");

      for (const action of trigger.actions) {
        console.log(
          "执行规则:",
          action.deviceName,
          action.deviceID,
          action.value
        );

        // 先判断设备现在的状态是不是已经是这个状态了
        const dev = getDeviceInfo(action.deviceID);
        if (!dev) {
          console.log("没这个设备 跳过");

          continue;
        }
        let compareValue = dev.status as unknown;

        switch (action.valueType) {
          case 0:
            break;
          case 1:
            compareValue = dev.value;
            break;
          case 2:
            compareValue = dev.value2;
            break;
          case 3:
            compareValue = dev.value3;
            break;
          case 4:
            compareValue = dev.value4;
            break;
          default:
            break;
        }
        if (compareValue == action.value) {
          console.log("状态已经是这个了 跳过");

          continue;
        }

        bus.emit("CtrlMsg", {
          id: action.deviceID,
          type: action.valueType,
          value: action.value,
        });
      }
    }
  }
};

const getDeviceInfo = (devId: number) => {
  const store = useAppStore();
  for (const room of store.homeStatus.rooms) {
    for (const device of room.devices) {
      if (device.id == devId) {
        return device;
      }
    }
  }
};

// 判断条件是否符合的函数

const checkCondition = (condition: conditionType) => {
  const store = useAppStore();

  // 先获取这个设备
  const currDev = getDeviceInfo(condition.deviceID);

  if (!currDev && condition.type == 0) {
    condition.met = false;
    return false;
  }

  if (condition.type == 0) {
    // 先判断要比较哪个数字
    let compareValue = currDev!.value as unknown;
    switch (condition.valueType) {
      case 0:
        compareValue = currDev!.status;
        break;
      case 1:
        compareValue = currDev!.value;
        break;
      case 2:
        compareValue = currDev!.value2;
        break;
      case 3:
        compareValue = currDev!.value3;
        break;
      case 4:
        compareValue = currDev!.value4;
        break;

      default:
        break;
    }
    console.log("要比较" + compareValue);

    // 根据不同的比较方式进行比较
    switch (condition.compare) {
      // 相等
      case 0:
        if (condition.value == compareValue) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }

      case -1:
        if ((compareValue as number) < (condition.value as number)) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }
      case 1:
        if ((compareValue as number) > (condition.value as number)) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }
      case 2:
        if (
          (condition.value as number) < (compareValue as number) &&
          (compareValue as number) < (condition.value as number)
        ) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }

      default:
        condition.met = false;
        return false;
    }
  } else if (condition.type == 1) {
    // 时间比较
    switch (condition.compare) {
      case 0:
        if (store.homeStatus.time == condition.value) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }
      case -1:
        if (store.homeStatus.time < (condition.value as number)) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }
      case 1:
        if (store.homeStatus.time > (condition.value as number)) {
          condition.met = true;
          return true;
        } else {
          condition.met = false;
          return false;
        }

      default:
        condition.met = false;
        return false;
    }
  }
};
