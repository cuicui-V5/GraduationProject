<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">添加新规则</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="1" class="font-weight-bold"> 条件: </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col cols="12" sm="3">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="选择设备"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="属性"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field name="name" label="数值" id="id"></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-btn icon="mdi-plus"></v-btn>
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col cols="auto" class="d-flex align-center"> 以上条件 </v-col>
            <v-col cols="2" class="font-weight-bold">
              <v-select
                :items="['同时满足', '任一满足']"
                value="全部满足"
                density="compact"
                required
              ></v-select>
            </v-col>
            <v-col class="d-flex align-center"> 时执行 </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="font-weight-bold"> 操作: </v-col>
            <v-row>
              <v-col cols="12" sm="3">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="选择设备"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="属性"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field name="name" label="数值" id="id"></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-btn icon="mdi-plus"></v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { ref } from "vue";
const dialog = ref(false);
</script>
