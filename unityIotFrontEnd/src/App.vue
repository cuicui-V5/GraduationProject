<template>
  <router-view />
</template>

<script lang="ts" setup>
import { enableWebsocket } from "@/api";
import { executeRule } from "./automation";
enableWebsocket();

// 执行自动规则
setInterval(executeRule, 1000);
</script>
