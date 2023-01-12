<template>
  <v-card>
    <v-card-text>
      <h1>Tạo mới người dùng</h1>
      <div class="bg-amber-accent-1 my-5 pa-2">Thông tin form</div>
      <div>
        <v-form style="height: 100%" ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <div>
                <label for="avatar">
                  <div class="image-container d-flex align-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
                         style="width: 300px; height: 184px"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                    </svg>
                  </div>
                </label>
                <input type="file" name="avatar" id="avatar"
                       accept="image/png, image/jpeg" class="d-none"/>
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="username" clearable v-model="params.username"
                                :rules="[v => !!v || 'username là bắt buộc']"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label ="full name" clearable v-model="params.fullname"
                                :rules="[v => !!v || 'fullname là bắt buộc']"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="password"
                    v-model="params.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    hint="Tối thiểu 6 từ"
                    counter
                    @click:append="show1 = !show1"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="password"
                    v-model="params.repeatPassWord"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min, rules.match]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    hint="Tối thiểu 6 từ"
                    counter
                    @click:append="show2 = !show2"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mt-10 px-5">
            <v-autocomplete
              label="Nhóm quyền"
              multiple
              :items="roles"
              item-value="id"
              item-title="name"
              v-model="params.roleIds"
              :rules="[v => !!v.length || 'fullname là bắt buộc']"
            >
            </v-autocomplete>
          </v-row>
        </v-form>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between my-5 px-5">
      <div></div>
      <div class="d-flex">
        <v-btn @click="close" color="gray">Đóng</v-btn>
        <v-btn color="success" @click="submit">Xác nhận</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {ref, toRefs, onMounted, onBeforeUnmount} from "vue";
import AclRepository from "@/services/AclRepository";
import {get} from "lodash"
import UserRepository from "@/services/UserRepository";
import Swal from 'sweetalert2';

onMounted(() => {
  getListRole();
  console.log(detailUser.value)
  if (detailUser.value) {
    params.value = detailUser.value;
  }
})
onBeforeUnmount(() => {

})
const props = defineProps({closePopup: Function, getListUser: Function, detailUser: Object});
const {closePopup, getListUser, detailUser} = toRefs(props);
const show1 = ref(false);
const show2 = ref(false);
const form = ref();
const roles = ref();
const repeatPassWord = ref('')
const params = ref({
  username: '',
  password: '',
  fullname: '',
  roleIds: []
})
const rules = {
  required: value => !!value || 'Password là bắt buộc.',
  min: v => v.length >= 6 || 'Tối thiểu 6 từ',
  match: v => v === params.value.password || 'Mật khẩu chưa khớp!'
}
const submit = async () => {
  form.value.validate();
  const request = params.value;
  const response = await UserRepository.create(request);
  if (response.success) {
    Swal.fire({
      icon: 'success',
      title: 'Thêm mới người dùng thành công!',
    })
    await getListUser.value()
  }
  console.log("response create user:", response)
}
const close = () => {
  closePopup.value();
}
const getListRole = async () => {
  const response = await AclRepository.getListRole();
  roles.value = get(response, "data", []);
}
</script>

<style>
.swal2-container {
  z-index: 20000 !important;
}
</style>
