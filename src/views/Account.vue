<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <div>
        <v-btn @click="saveGame" color="primary" prepend-icon="mdi-plus" style="text-transform: initial">
          Thêm mới
        </v-btn>
      </div>
      <div class="d-flex align-center" style="width: 500px;">
        <div style="width: 90%;">
          <v-text-field @change="getListUser" v-model="search" variant="underlined"></v-text-field>
        </div>
        <div style="position: relative; width: 30%;">
          <v-btn @click="getListUser" class="ml-4" color="primary"
                 style="width: 70%; height: 35px; text-transform: initial">
            Tìm kiếm
          </v-btn>
          <div>
          </div>
        </div>
      </div>
    </div>
    <v-table style="margin-top: 60px;" hover fixed-header class="table-user">
      <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">
          User name
        </th>
        <th class="text-left">
          Full name
        </th>
        <th class="text-left">
          Image
        </th>
        <th class="text-left" style="width: 100px;">
          Thao tác
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.fullname }}</td>
        <td>
          <v-avatar color="surface-variant">
            <v-img
              cover
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
        </td>
        <td>
          <div class="d-flex">
            <v-btn @click="saveGame(user)" class="mr-2" icon width="32" height="32" variant="flat">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
            <v-btn icon width="32" height="32" variant="flat">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-pagination
      class="mt-10"
      v-model="page"
      :length="totalPages"
      :total-visible="10"
    ></v-pagination>
  </div>
  <v-dialog v-model="modal" width="1200px" height="1000px">
    <ModalUser :closePopup="closePopup" :getListUser="getListUser" :detailUser="detailUser" />
  </v-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";
import UserRepository from "../services/UserRepository";
import {get} from "lodash";
import ModalUser from "../components/ModalUser"

onMounted(() => {
  getListUser()
})
const modal = ref(false)
const page = ref(1)
const totalPages = ref();
const search = ref('');
const users = ref([]);
const detailUser = ref();
const getListUser = async () => {
  const params = {
    search: search.value
  }
  const response = await UserRepository.listUser(params);
  users.value = get(response, 'data', []);
  totalPages.value = get(response, 'pagination.totalPages');
}
const saveGame = (user) => {
  modal.value = true;
  if (user) {
    detailUser.value = user;
  }

}
const closePopup = () => {
  modal.value = false;
  detailUser.value = {}
}
</script>

<style>
.table-user .v-table__wrapper table tr td {
  padding: 16px!important;
}
</style>
