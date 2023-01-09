<template>
  <div class="pa-5">
    <div>
      <h1 class="mb-10">Thông tin quyền</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Tên quyền *"
            clearable
            variant="underlined"
            v-model="permissonDetail.name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Description"
            clearable
            variant="underlined"
            v-model="permissonDetail.description"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-table hover fixed-header fixed-footer class="table-role">
        <thead>
        <tr>
          <th class="text-left" style="width: 500px;">
            Name
          </th>
          <th class="text-left">
            Truy cập
          </th>
          <th class="text-left">
            Thêm
          </th>
          <th class="text-left">
            Sửa
          </th>
          <th class="text-left">
            Xóa
          </th>
          <th class="text-left">
            Tất cả
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            Name
          </td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
        </tr>
        </tbody>
      </v-table>
      <div class="d-flex justify-space-between">
        <div></div>
        <v-btn class="mr-10" color="primary">Xác nhận</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import aclRepository from "../services/AclRepository";
import {useRouter} from "vue-router/dist/vue-router";

onBeforeMount(() => {
  console.log("vao day")
  getPermission()
})
const router = useRouter();
const permissionId = router.currentRoute.value.params.id;
const permissonDetail = ref({
  name: '',
  description: ''
});
const getPermission = async () => {
  const response = await aclRepository.getPermission(permissionId);
  console.log("res:", response)
  permissonDetail.value = response.data
}
</script>

<style>
.table-role table {
  padding: 16px 0;
}
</style>
