<template>
  <div>
    <div class="d-flex justify-space-between align-center my-3">
      <div>
        <div>
          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn
                    color="red"
                    v-bind="mergeProps(menu, tooltip)"
                  >
                    <v-icon>mdi-alert-octagon</v-icon>
                    Xóa item
                  </v-btn>
                </template>
                <span>I'm A Tooltip</span>
              </v-tooltip>
            </template>
          </v-menu>
        </div>
      </div>
      <div>
        <v-btn @click="showPopup = true" color="green">Thêm mới</v-btn>
      </div>
    </div>
    <div class="table-item">
      <table class="table">
        <colgroup>
          <col style="width: 40px"/>
          <col style="width: 200px"/>
          <col style="width: 250px"/>
          <col style="width: 250px"/>
          <col style="width: 350px"/>
          <col style="width: 300px"/>
          <col style="width: 300px"/>
          <col style="width: 80px"/>
        </colgroup>
        <thead class="thead-primary">
        <tr>
          <th>&nbsp;</th>
          <th>Image</th>
          <th>Name</th>
          <th>Tags</th>
          <th>Link Download</th>
          <th>Description</th>
          <th>content</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr class="alert" role="alert" v-for="(list, index) in lists" :key="index">
          <td>
            <label class="checkbox-wrap checkbox-primary">
              <input type="checkbox">
              <span class="checkmark"></span>
            </label>
          </td>
          <td>
            <v-img
              :src="list.image"></v-img>
          </td>
          <td>
            <div class="email">
              <span>{{list.name}}</span>
            </div>
          </td>
          <td>
            <div>
              <v-chip
                v-for="(tag, iTag) in list.gameTag"
                :key="iTag"
                class="ma-1"
                size="x-small"
                :color="tag.color"
                text-color="white"
              >{{tag.name}}
              </v-chip>
            </div>
          </td>
          <td class="quantity">
            <div class="input-group" v-for="(link, iLink) in list.download" :key="iLink">
              <b>{{link.name}}: </b> <span>{{link.url}}</span>
            </div>
          </td>
          <td>
            {{list.description}}
          </td>
          <td>
            {{list.content}}
          </td>
          <td class="action">
            <div class="d-flex">
              <v-btn @click="openPopup(list)" icon width="32px" height="32px" class="mr-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon width="32px" height="32px">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
      ></v-pagination>
    </div>
    <v-dialog v-model="showPopup" width="1200px" height="1000px" :scrollable="true">
      <PopupDetail :closePopup="closePopup"/>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, mergeProps, onMounted, reactive} from "vue";
import PopupDetail from "@/components/PopupDetail.vue";
import GameRepository from "@/services/GameRepository";

onMounted(() => {
  getListGame()
})
const lists = ref([])
const page = ref(1);
const showPopup = ref(false);
let totalItem = ref();
let totalPages = ref();
const closePopup = () => {
  showPopup.value = false;
}
const getListGame = async () => {
  const params = {}
  const response = await GameRepository.getListGame(params);
  totalItem.value = response.pagination.totalElements;
  totalPages.value = response.pagination.totalPages;
  lists.value = response.data;
}
const openPopup = (game: any) => {
  showPopup.value = true
}
</script>
<style>
.table-item {
  overflow: auto;
  margin-top: 45px;
}

.table {
  min-width: 1000px !important;
  width: 100%;
  background: #fff;
  -webkit-box-shadow: 0px 5px 12px -12px rgb(0 0 0 / 29%);
  -moz-box-shadow: 0px 5px 12px -12px rgba(0, 0, 0, 0.29);
  box-shadow: 0px 5px 12px -12px rgb(0 0 0 / 29%);
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
  table-layout: fixed;
}

table thead.thead-primary {
  background: #99b19c;
}

.table thead th {
  border: none;
  padding: 16px;
  font-size: 13px;
  font-weight: 500;
  color: white;
  vertical-align: bottom;
  text-align: inherit;
}

.table tbody tr {
  margin-bottom: 10px;
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.table tbody th, .table tbody td {
  border: none;
  padding: 8px;
  font-size: 14px;
  background: #fff;
  border-bottom: 4px solid #f8f9fd;
  vertical-align: middle;
}

.checkbox-primary {
  color: #99b19c;
}

.checkbox-wrap {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

label {
  margin-bottom: 0.5rem;
}

.alert:hover {
  background: #99b19c !important;
}
</style>
