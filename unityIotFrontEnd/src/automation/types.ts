// 自动化系统的规则存储
// 自动化操作分为两部分: 触发条件, 执行操作
export interface autoType {
  triggers: triggerType[];
}
export interface triggerType {
  enabled: boolean;
  met: boolean;
  name: string;
  id: number;
  condition: {
    mode: "and" | "or"; // 0 and, 1 or
    conditions: conditionType[];
  };
  actions: actionType[];
}

export interface conditionType {
  met: boolean;
  id: number;
  deviceID: number;
  deviceName: string;
  deviceType: "tv" | "fan" | "light" | "cam" | "sensor";
  type: 0 | 1;
  /*   0 设备数值比较, 1 与当前时间比较   */
  compare: 0 | 1 | -1 | 2;
  /*   0 相等   1 大于  -1 小于  2 范围 */
  valueType: 0 | 1 | 2 | 3 | 4;
  value: any;
  value2: any;
}
export interface actionType {
  id: number;
  deviceID: number;
  deviceName: string;
  deviceType: "tv" | "fan" | "light" | "cam" | "sensor";

  /*   操作类型  0 改变status  1 改value  2 value2 3 value3  4 value4 字符串类型  */
  valueType: 0 | 1 | 2 | 3 | 4;
  value: any;
}
