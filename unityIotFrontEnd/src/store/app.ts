import { defineStore } from "pinia";
import { homeStatusType } from "@/api/types";
import { autoType } from "@/automation/types";
export const useAppStore = defineStore("app", {
  state: () => ({
    showDrawer: null as any,
    homeStatus: {} as homeStatusType,
    connectStatus: false,
    automationRules: {
      triggers: [
        //多个触发器
        {
          name: "测试自动化规则",
          id: 123,
          enabled: true,
          condition: {
            mode: "or", // 0 and, 1 or
            conditions: [
              {
                deviceID: 66178,
                deviceName: "台灯",
                deviceType: "light",
                id: 123,
                type: 0,
                /*
                              0 与设备数值比较, 1 与当前时间比较
                              */
                compare: 0,
                /*
                              0 设备数值与value相等
                              1 大于
                              -1 小于
                              2 范围
                              */
                valueType: 0,
                value: true,
              },
              {
                deviceID: 123,
                deviceName: "灯",
                deviceType: "light",
                id: 123,
                type: 1,
                /*
                              0 设备数值比较, 1 与当前时间比较
                              */
                compare: 1,
                /*
                              0 等于
                              1 大于
                              -1 小于
                              2 范围
                              */
                valueType: 1,
                value: 500,
                value2: 1000,
              },
            ],
          },
          actions: [
            {
              deviceName: "空调",
              deviceType: "fan",
              deviceID: 123,
              /*
                          操作类型
                          0 改变status
                          1 改value
                          2 value2
                          3 value3
                          4 value4 字符串类型
                           */
              valueType: 0,
              value: 123,
            },
            {
              deviceName: "灯",
              deviceType: "light",
              deviceID: 7980,
              /*
                          操作类型
                          0 改变status
                          1 改value
                          2 value2
                          3 value3
                          4 value4 字符串类型
                           */
              valueType: 1,
              value: 19,
            },
          ],
        },
      ],
    } as autoType,
  }),
});
