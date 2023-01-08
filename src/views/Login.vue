<template>
  <v-container>
    <v-card class="box " width="600" style="margin: 0 auto">
      <div class="d-flex align-center justify-center flex-column">
        <div class="d-flex align-center flex-column">
          <h1 class="text-amber-lighten-1">Xin chào</h1>
          <span class="my-4">Đăng nhập vào tài khoản của bạn</span>
        </div>
      </div>
      <v-divider></v-divider>
      <v-form class="pa-5">
        <v-text-field v-model="username" label="Tên đăng nhập"></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Normal with hint text"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <div class="d-flex align-center">
          <input type="checkbox" class="mr-3">
          <span>Ghi nhớ mật khẩu</span>
        </div>
        <v-btn @click="login" color="green" class="mt-5">Đăng nhập</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import {ref, reactive} from 'vue';
import { useRouter } from "vue-router";
import AuthRepository from "../services/AuthRepository";
import {TokenService} from "../services/token";

const router = useRouter()
const rules = reactive({
  required: value => !!value || 'Required.',
  min: v => v.length >= 6 || 'Min 6 characters',
})
const password = ref('');
const username = ref('');
const show1 = ref(false);
const login = async () => {
  const params = {
    username: username.value,
    password: password.value
  }
  const res = await AuthRepository.login(params);
  if (res.success) {
    TokenService.setToken(res.data?.access_token);
    TokenService.setUser(res.data.userId)
    window.location.href = '/'
  }
}
</script>

<style scoped>
</style>
