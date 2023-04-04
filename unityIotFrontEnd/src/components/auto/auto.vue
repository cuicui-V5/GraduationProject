<template>
  <v-container>
    <v-btn @click="showNewDialog" color="primary"> 添加新规则 </v-btn>
  </v-container>
  <addAutoDialog
    v-model="isShowDialog"
    :mode="dialogMode"
    :index="dialogIndex"
    @closeDialog="closeDialog"
  ></addAutoDialog>
  <v-container class="mx-0">
    <v-row>
      <v-col
        v-for="(trigger, index) in store.automationRules.triggers"
        :key="trigger.id"
        cols="12"
        md="6"
        lg="4"
      >
        <autoCard
          :trigger="trigger"
          :index="index"
          @showEditDialog="showEditDialog"
        ></autoCard>
      </v-col>
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
import addAutoDialog from "@/components/auto/addAuto.vue";
import { executeRule } from "@/automation/index";
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { Ref } from "vue";

const isShowDialog = ref(false);
const dialogMode = ref() as Ref<"edit" | "new">;
const dialogIndex = ref(0);
dialogMode.value = "new";

const store = useAppStore();

const showNewDialog = () => {
  dialogMode.value = "new";

  isShowDialog.value = true;
};
const showEditDialog = (index: number) => {
  dialogIndex.value = index;
  dialogMode.value = "edit";
  isShowDialog.value = true;
};
const closeDialog = () => {
  isShowDialog.value = false;
};
</script>

<style scoped lang="less"></style>
