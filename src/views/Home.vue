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
        <v-btn color="green">Thêm mới</v-btn>
      </div>
    </div>
    <div class="table-item">
      <table class="table">
        <colgroup>
          <col style="width: 40px"/>
          <col style="width: 200px"/>
          <col style="width: 250px"/>
          <col style="width: 250px"/>
          <col style="width: 250px"/>
          <col style="width: 250px"/>
          <col style="width: 300px"/>
          <col style="width: 80px"/>
        </colgroup>
        <thead class="thead-primary">
        <tr>
          <th>&nbsp;</th>
          <th>Image</th>
          <th>Name</th>
          <th>Tags</th>
          <th>Google link</th>
          <th>Fshare link</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr class="alert" role="alert">
          <td>
            <label class="checkbox-wrap checkbox-primary">
              <input type="checkbox">
              <span class="checkmark"></span>
            </label>
          </td>
          <td>
            <v-img
              src="https://cdn1.epicgames.com/offer/3428aac705b44d88beb8334780fa33bd/EGS_SEASONAlettertothefuture_ScavengersStudio_S2_1200x1600-fd02caab75848d7b7ab3633bc0503ec7?h=854&resize=1&w=640"></v-img>
          </td>
          <td>
            <div class="email">
              <span>Sneakers Shoes 2020 For Men </span>
              <span>Fugiat voluptates quasi nemo, ipsa perferendis</span>
            </div>
          </td>
          <td>
            <div>
              <v-chip
                class="ma-1"
                size="x-small"
                color="secondary"
                text-color="white"
              >Action
              </v-chip>
              <v-chip
                class="ma-1"
                size="x-small"
                color="green"
                text-color="white"
              >Action
              </v-chip>
              <v-chip
                class="ma-1"
                size="x-small"
                color="red"
                text-color="white"
              >Action
              </v-chip>
            </div>
          </td>
          <td class="quantity">
            <div class="input-group">
              <input type="text" name="quantity" class="quantity form-control input-number" value="1" min="1" max="100">
            </div>
          </td>
          <td>$30.99</td>
          <td>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </td>
          <td class="action">
            <div class="d-flex">
              <v-btn @click="showPopup = true" icon width="32px" height="32px" class="mr-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon width="32px" height="32px">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
        <tr class="alert" role="alert">
          <td>
            <label class="checkbox-wrap checkbox-primary">
              <input type="checkbox">
              <span class="checkmark"></span>
            </label>
          </td>
          <td>
            <v-img
              src="https://cdn1.epicgames.com/offer/3428aac705b44d88beb8334780fa33bd/EGS_SEASONAlettertothefuture_ScavengersStudio_S2_1200x1600-fd02caab75848d7b7ab3633bc0503ec7?h=854&resize=1&w=640"></v-img>
          </td>
          <td>
            <div class="email">
              <span>Sneakers Shoes 2020 For Men </span>
              <span>Fugiat voluptates quasi nemo, ipsa perferendis</span>
            </div>
          </td>
          <td>
            <div>
              <v-chip
                class="ma-1"
                size="x-small"
                color="secondary"
                text-color="white"
              >Action
              </v-chip>
              <v-chip
                class="ma-1"
                size="x-small"
                color="green"
                text-color="white"
              >Action
              </v-chip>
              <v-chip
                class="ma-1"
                size="x-small"
                color="red"
                text-color="white"
              >Action
              </v-chip>
            </div>
          </td>
          <td class="quantity">
            <div class="input-group">
              <input type="text" name="quantity" class="quantity form-control input-number" value="1" min="1" max="100">
            </div>
          </td>
          <td>$30.99</td>
          <td>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </td>
          <td class="action">
            <div class="d-flex">
              <v-btn icon width="32px" height="32px" class="mr-2">
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
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>
    <v-dialog v-model="showPopup" width="1200px" height="1000px" scrollable="false">
      <PopupDetail/>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, mergeProps} from "vue";
import PopupDetail from "@/components/PopupDetail.vue";

const page = ref(1)
const showPopup = ref(false)
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
