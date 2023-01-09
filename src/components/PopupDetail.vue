<template>
  <v-card>
    <v-card-text>
      <h1>Cập nhật game</h1>
      <div class="bg-amber-accent-1 my-5 pa-2">Thông tin game</div>
      <div>
        <div>
          <v-form style="height: 100%" ref="form">
            <v-container style="height: 100%">
              <v-row
                align="start"
                no-gutters
              >
                <v-col cols="12" md="4">
                  <div class="picture">
                    <div v-if="!params.image">
                      <label for="avatar">
                        <div class="image-container d-flex align-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
                               stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                          </svg>
                        </div>
                      </label>
                      <input @change="createImage($event)" type="file" name="avatar" id="avatar"
                             accept="image/png, image/jpeg" class="d-none"/>
                    </div>
                    <div v-else>
                      <label for="avatar">
                        <div style="width: 300px; height: 300px">
                          <v-img :src="params.image" cover></v-img>
                          <input @change="createImage($event)" type="file" name="avatar" id="avatar"
                                 accept="image/png, image/jpeg" class="d-none"/>
                        </div>
                      </label>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="params.name"
                        label="Name"
                        variant="underlined"
                        :rules="[v => !!v || 'Name là bắt buộc']"
                        clearable>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select label="Tag"
                                v-model="params.gameTag"
                                variant="underlined"
                                multiple clearable
                                :items="optionGame"
                                item-title="name"
                                :rules="[v => !!v.length || 'Tag là bắt buộc']"
                                item-value="id">
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select label="Category"
                                v-model="params.gameCategory"
                                variant="underlined"
                                multiple clearable
                                :items="categories"
                                item-title="name"
                                :rules="[v => !!v.length || 'Category là bắt buộc']"
                                item-value="id">
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row v-for="(linkOption, iArryLink) in arrayLinks" :key="iArryLink">
                    <v-col cols="12" md="3">
                      <v-select
                        label="Loại link"
                        v-model="linkOption.type"
                        :items="LINK_TYPE"
                        item-title="name"
                        item-value="id"
                        variant="underlined"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="9">
                      <v-text-field
                        variant="underlined"
                        clearable
                        v-model="linkOption.url"
                        :rules="[v => !!v || 'Link là bắt buộc']"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <div class="d-flex justify-space-between">
                    <div></div>
                    <div>
                      <v-btn @click="addLinkOption" color="primary" style="text-transform: initial">Thêm link +</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <div class="pa-4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea
                    v-model="params.description"
                    label="Description"
                    clearable
                    no-resize
                    rows="1"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row style="height: 300px">
                <v-col cols="12" md="12">
                  <QuillEditor theme="snow" placeholder="Content" toolbar="essential" v-model="params.content"/>
                </v-col>
              </v-row>
              <v-row style="height: 200px; margin-top: 50px;">
                <v-col cols="12" md="12">
                  <QuillEditor theme="snow" placeholder="Install game" toolbar="essential" v-model="params.content"/>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex justify-space-between align-center w-100">
        <div></div>
        <div class="py-4 mr-5">
          <v-btn @click="cancelAction" color="red">Hủy</v-btn>
          <v-btn @click="storeGame" color="green">Xác nhận</v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, inject, onMounted} from 'vue';
import {optionGame, categories, LINK_TYPE} from "@/constants/index.constant";
import GameRepository from "@/services/GameRepository";
import Swal from 'sweetalert2';
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {payloadGame} from "@/interfaces/game.interface";

const props = defineProps<{ closePopup: Function, gameDetail: any }>();
const {closePopup} = toRefs(props);
const {gameDetail} = toRefs(props);
const arrayLinks = ref([
  {type: 1, url: ''}
])
const form = ref();
let gameImage: any = ref('');
let file: any;
let params = reactive({
  name: '',
  gameTag: [],
  links: [],
  description: '',
  content: '',
  gameCategory: [],
  image: '',
})
onMounted(() => {
  if (gameDetail.value) {
    params = gameDetail.value;
    arrayLinks.value = gameDetail.value.download;
  }
})
const createImage = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (!files || !files[0]) return;
  let formData = new FormData();
  formData.append('file', files[0]);
  const response = await GameRepository.uploadImage(formData);
  if ('data' in response) {
    gameImage.value = response['data']?.Location;
  }
}
const cancelAction = () => {
  closePopup.value();
}
const storeGame = async () => {
  await form.value.validate();
  const payload: payloadGame = {
    name: params.name,
    tags: params.gameTag,
    image: gameImage.value,
    description: params.description,
    content: params.content,
    categories: params.gameCategory,
    links: arrayLinks.value,
  }
  const response = await GameRepository.create(payload);
  if (response.data) {
    Swal.fire({
      icon: 'success',
      title: 'Done!',
    })
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Có lỗi xảy ra, thử lại sau!',
    })
  }
}
const addLinkOption = () => {
  arrayLinks.value.push({type: 1, url: ''})
}
</script>

<style>
.image-container {
  width: 300px;
  height: 300px;
  background: #99b19c;
}

.swal2-container {
  z-index: 20000 !important;
}
</style>
