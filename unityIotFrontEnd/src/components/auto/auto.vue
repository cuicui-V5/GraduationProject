<template>
  <div class="text-h1">家居自动化</div>
  <v-btn @click="test"> 测试 </v-btn>
  <v-btn @click="addRule"> 添加新规则 </v-btn>
  <addAuto></addAuto>
  <v-container grid-list-xs>
    <v-row v-for="trigger in store.automationRules.triggers" :key="trigger.id">
      <v-col cols="6"> <autoCard :trigger="trigger"></autoCard> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "",
};
</script>
<script setup lang="ts">
import autoCard from "@/components/auto/autoCard.vue";
import addAuto from "@/components/auto/addAuto.vue";
import { executeRule } from "@/automation/index";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const test = () => {
  executeRule();
};
const addRule = () => {
  executeRule();
};
</script>

<style scoped lang="less"></style>
