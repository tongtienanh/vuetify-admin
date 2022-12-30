<template>
  <v-card>
    <v-card-text>
      <h1>Cập nhật game</h1>
      <div class="bg-amber-accent-1 my-5 pa-2">Thông tin game</div>
      <div>
        <div>
          <v-container>
            <v-row
              align="start"
              no-gutters
              style="height: 150px;"
            >
              <v-col cols="12" md="4">
                <div class="picture">
                  <div v-if="!gameImage">
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
                        <v-img :src="gameImage"></v-img>
                        <input @change="createImage($event)" type="file" name="avatar" id="avatar"
                               accept="image/png, image/jpeg" class="d-none"/>
                      </div>
                    </label>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="params.name"
                      label="Name"
                      variant="underlined"
                      :rules="[v => !!v || 'Name là bắt buộc']"
                      clearable>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select label="Tag" variant="underlined" multiple clearable></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      label="Link Google"
                      variant="underlined"
                      clearable
                      v-model="params.googleLink"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      label="Link Fshare"
                      variant="underlined"
                      clearable
                      v-model="params.fShareLink"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      v-model="params.description"
                      label="Description"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex justify-space-between align-center w-100">
        <div></div>
        <div class="py-4 mr-5">
          <v-btn @click="cancelAction" color="red">Hủy</v-btn>
          <v-btn color="green">Xác nhận</v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs} from 'vue';

const props = defineProps<{ closePopup: Function }>();
const {closePopup} = toRefs(props);
let gameImage: any = ref('');
let file: any;
let params = reactive({
  name: ''
})
const createImage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (!files || !files[0]) return;
  gameImage.value = URL.createObjectURL(files[0])
}
const cancelAction = () => {
  closePopup.value();
}
</script>

<style scoped>
.image-container {
  width: 300px;
  height: 300px;
  background: #99b19c;
}
</style>
