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
                    icon
                    color="red"
                    width="36"
                    height="36"
                    v-bind="mergeProps(menu, tooltip)"
                    @click="delteMore"
                  >
                    <v-icon>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </template>
                <span>Xóa nhiều game</span>
              </v-tooltip>
            </template>
          </v-menu>
        </div>
      </div>
      <div class="d-flex align-center" style="width: 500px;">
        <div style="width: 90%;">
          <v-text-field variant="underlined" v-model="search" @change="getListGame"></v-text-field>
        </div>
        <div style="position: relative; width: 30%;">
          <v-btn @click="getListGame" class="ml-4" color="primary"
                 style="width: 100%; height: 35px; text-transform: initial">
            Tìm kiếm
          </v-btn>
          <div>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="ml-3 icon-filter">mdi-chevron-down</v-icon>
              </template>
              <v-card min-width="500px" min-height="100px">
                <div style="padding: 20px 20px">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select v-model="tags" label="Tags" multiple :items="optionGame" item-title="name"
                                item-value="id" clearable>
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select v-model="category" label="categories" multiple :items="categories" item-value="id"
                                item-title="name" clearable>
                      </v-select>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-menu>
          </div>
        </div>
      </div>
      <div>
        <v-btn icon width="36" height="36" @click="showPopup = true" color="green">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="table-item">
      <table class="table">
        <colgroup>
          <col style="width: 50px"/>
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
            <v-checkbox v-model="list.check"></v-checkbox>
          </td>
          <td>
            <v-img
              :src="list.image"></v-img>
          </td>
          <td>
            <div class="email">
              <span>{{ list.name }}</span>
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
              >{{ tag.name }}
              </v-chip>
            </div>
          </td>
          <td class="quantity">
            <div class="input-group mt-2" v-for="(link, iLink) in list.download" :key="iLink">
              <b>{{ type[link.type] }}: </b> <a :href="link.url" target="_blank">{{ link.url }}</a>
            </div>
          </td>
          <td>
            {{ list.description }}
          </td>
          <td>
            {{ list.content }}
          </td>
          <td class="action">
            <div class="d-flex">
              <v-btn @click="openPopup(list)" icon width="32px" height="32px" class="mr-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteGame(list.id)" icon width="32px" height="32px">
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
      <PopupDetail :closePopup="closePopup" :gameDetail="gameDetail" :getListGame="getListGame" />
    </v-dialog>
  </div>

</template>

<script lang="ts" setup>
import {ref, mergeProps, onMounted, reactive} from "vue";
import PopupDetail from "@/components/PopupDetail.vue";
import GameRepository from "@/services/GameRepository";
import {optionGame, categories, type} from "../constants/index.constant"
import {deleteParam} from "@/interfaces/game.interface";
import Swal from 'sweetalert2';

onMounted(() => {
  getListGame()
})

const menu = ref(false)
const search = ref('');
const tags = ref([]);
const category = ref([]);
const lists = ref([]);
const page = ref(1);
const showPopup = ref(false);
let totalItem = ref();
let totalPages = ref();
const gameDetail = ref();
const closePopup = () => {
  showPopup.value = false;
}
const getListGame = async () => {
  const params = {
    search: search.value,
    tags: tags.value,
    categories: category.value,
  }
  const response = await GameRepository.getListGame(params);
  totalItem.value = response.pagination.totalElements;
  totalPages.value = response.pagination.totalPages;
  const res = response.data.map((item: any) => {
    const image = item.media.find((iMedia: { size: string; }) => iMedia.size == "203x271")
    return {
      ...item,
      image: image.uri,
      check: false
    }
  })
  lists.value = res;
  console.log("response.data:", res)
  console.log("lists.value:", lists.value)

}
const openPopup = (game: any) => {
  showPopup.value = true;
  gameDetail.value = game;
}

const deleteGame = async (gameid: any, gameIds?: any) => {
  Swal.fire({
    title: 'Xóa game?',
    text: "Hãy chắc chắn điều này",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa game!',
    cancelButtonText: 'Đóng',
  }).then(async (result) => {
    if (result.isConfirmed) {
      let params: deleteParam = {
        ids: [+gameid]
      }
      if (gameIds && gameIds.length) {
        params = {
          ids: gameIds
        }
      }
      const response = await GameRepository.deleteGame(params);
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          timer: 1000,
        })
        getListGame();
      }
    }
  })
}
const delteMore = async () => {
  const gameIds = lists.value.filter(s => s["check"]).map(item => item["id"])
   await deleteGame( null, gameIds)
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

.icon-filter {
  position: absolute;
  top: 6px;
  right: -12px;
  color: #fff;
}
</style>
