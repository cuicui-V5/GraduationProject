// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "home",
        default: true,
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "unityIOT - 智能家居仿真平台",
        },
      },
      {
        path: "/automation",
        name: "auto",
        component: () => import("@/views/Auto.vue"),
        meta: {
          title: "自动化规则 - 唤醒你的家",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
