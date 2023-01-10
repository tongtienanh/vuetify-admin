<template>
  <div class="pa-5">
    <v-row>
      <v-col cols="12" md="6" v-for="(module, index) in modules" :key="index">
        <v-card elevation="2" class="card-module">
          <v-card-title class="d-flex justify-space-between align-center" style="background: #f3f2f9; color: #000000DE; font-weight: bold;">
            <div>{{module.name}}</div>
            <div class="pr-4">
              <v-checkbox class="checkbox-permission"></v-checkbox>
            </div>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item class="d-flex align-center item-topic" v-for="(permission, iPer) in module.permissions" :key="iPer">
                  <v-list-item-icon>
                    <strong class="pb-2" style="font-size: 16px;">{{iPer + 1}}.</strong>
                  </v-list-item-icon>
                  <v-list-item-content class="ml-3 d-flex justify-space-between align-center" style="width: 100%;">
                    <v-list-item-title style="font-size: 18px;">{{permission.name}}</v-list-item-title>
                    <div class="d-flex align-center">
                      <v-checkbox class="checkbox-permission"></v-checkbox>
<!--                      <v-btn icon width="32" height="32" flat><v-icon>mdi-delete-outline</v-icon></v-btn>-->
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="mt-5 d-flex justify-space-between">
      <div></div>
      <v-btn class="mr-10" color="primary">Xác nhận</v-btn>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import AclRepository from "../services/AclRepository";
onMounted(() => {
  getModules();
})
const modules = ref([])
const getModules = async () => {
  const response = await AclRepository.getModules()
  modules.value = response.data;
}
</script>

<style>
.item-topic .v-list-item__content {
  display: flex !important;
  align-items: center !important;
  width: 100%;
}
.new-module {
  display: none!important;
}
.checkbox-permission .v-input__details {
  display: none!important;
}
</style>
