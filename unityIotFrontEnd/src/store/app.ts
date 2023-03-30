// Utilities
import { defineStore } from "pinia";
import { homeStatusType } from "@/api/types";
export const useAppStore = defineStore("app", {
  state: () => ({
    showDrawer: null as any,
    homeStatus: {} as homeStatusType,
    connectStatus: false,
  }),
});
