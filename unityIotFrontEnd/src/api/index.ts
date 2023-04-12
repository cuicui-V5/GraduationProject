import { useAppStore } from "@/store/app";
import { homeStatusType } from "./types";
import bus from "@/utils/bus";
export const enableWebsocket = () => {
  const store = useAppStore();
  const ws = new WebSocket("ws://127.0.0.1:1234");
  ws.onopen = function () {
    console.log("Connection open ...");
    const msg = {
      type: "web",
    };
    ws.send(JSON.stringify(msg));
    store.connectStatus = true;
  };

  ws.onmessage = function (evt) {
    const data = JSON.parse(evt.data);
    if (data.type == "home_status") {
      store.homeStatus = data as homeStatusType;
    }
  };

  ws.onclose = function (evt) {
    console.log("Connection closed.");
    store.homeStatus = {} as any;
    store.connectStatus = false;
  };
  bus.on("CtrlMsg", (option) => {
    console.log(option);
    const { id, type, value } = option as {
      id: number;
      type: number;
      value: number | boolean | string;
    };
    const ctrl = {
      command: "ctrl",
      id,
      type,
      status: false,
      value: 0,
      value4: "",
    };
    if (type == 0) {
      ctrl.status = value as boolean;
    }
    if (type == 1) {
      ctrl.value = value as number;
    }
    if (type == 2) {
      ctrl.value = value as number;
    }
    if (type == 3) {
      ctrl.value = value as number;
    }
    if (type == 4) {
      ctrl.value4 = value as string;
    }
    ws.send(JSON.stringify(ctrl));
  });
};
