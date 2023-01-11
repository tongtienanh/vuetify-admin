<template>
  <div class="pa-5">
    <v-form ref="formRole">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="params.name" :rules="[v => !!v || 'Tên vai trò là bắt buộc']" label="Tên vai trò"></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea v-model="params.description"  label="Mô tả" rows="2"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" v-for="(module, index) in modules" :key="index">
          <v-card elevation="2" class="card-module">
            <v-card-title class="d-flex justify-space-between align-center"
                          style="background: #f3f2f9; color: #000000DE; font-weight: bold;">
              <div>{{ module.name }}</div>
              <div class="pr-4">
                <v-checkbox v-model="module.checkAll" @change="checkAll(module)" class="checkbox-permission"></v-checkbox>
              </div>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item-group>
                  <v-list-item class="d-flex align-center item-topic" v-for="(permission, iPer) in module.permissions"
                               :key="iPer">
                    <v-list-item-icon>
                      <strong class="pb-2" style="font-size: 16px;">{{ iPer + 1 }}.</strong>
                    </v-list-item-icon>
                    <v-list-item-content class="ml-3 d-flex justify-space-between align-center" style="width: 100%;">
                      <v-list-item-title style="font-size: 18px;">{{ permission.name }}</v-list-item-title>
                      <div class="d-flex align-center">
                        <v-checkbox class="checkbox-permission" v-model="permission.check" @change="getPermissionId(permission)"></v-checkbox>
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
        <v-btn @click="submitRole" class="mr-10" color="primary">Xác nhận</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import AclRepository from "../services/AclRepository";

onMounted(() => {
  getModules();
})
const params = ref({
  name: '',
  description: '',
  permissionsId: []
})
const checkbox = ref();
const formRole = ref();
const modules = ref([]);
const getModules = async () => {
  const response = await AclRepository.getModules()
  modules.value = response.data;
  modules.value = modules.value.map((item) => {
    const permissions = item.permissions.map((iPer) => {
      return {
        ...iPer,
        check: false
      }
    })
    return {
      ...item,
      permissions,
      checkAll: false
    }
  })
}
const submitRole = async () => {
  await formRole.value.validate();
  const response = await AclRepository.storeRole(params.value)
  console.log("response:", response);
}
const getPermissionId = (permissionId) => {
  if (permissionId.check) {
    params.value.permissionsId.push(permissionId.id)
  }
  else {
    params.value.permissionsId = params.value.permissionsId.filter(item => item != permissionId.id)
  }
}
const checkAll = (module) => {
  module.checkAll = !module.checkAll
    params.value.permissionsId = [];
    modules.value.forEach((item) => {
      item.permissions.forEach((iPer) => {
        if (item.id == module.id && module.checkAll) {
          iPer.check = true;
          params.value.permissionsId.push(iPer.id)
        } else if (item.id == module.id && !module.checkAll) {
          iPer.check = false;
          params.value.permissionsId = params.value.permissionsId.filter(item => item != iPer.id)

        }
      })
    })
}
watch(modules, (currentState, prevState) => {
  modules.value.forEach((iModule) => {
    const checkAll = iModule.permissions.every(item => item.check)
    if (checkAll) iModule.checkAll = true;
    else iModule.checkAll = false;
  })
}, {deep: true})
</script>

<style>
.item-topic .v-list-item__content {
  display: flex !important;
  align-items: center !important;
  width: 100%;
}

.new-module {
  display: none !important;
}

.checkbox-permission .v-input__details {
  display: none !important;
}
</style>
