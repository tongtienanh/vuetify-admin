<template>
  <v-app-bar flat style="border-bottom: 1px solid #e9e8e8">
    <v-app-bar-title>
      <div class="d-flex justify-lg-space-between">
        <div class="d-flex">
          <v-icon icon="mdi-circle-slice-6" class="mr-3" />
          <h1 style="color: rgb(51 198 155)">{{path}}</h1>
        </div>
        <div class="pr-4">
          <v-btn outlined @click="logout">Logout</v-btn>
        </div>
      </div>
    </v-app-bar-title>
  </v-app-bar>
  <v-card>
    <v-layout style="height: 100vh;">
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-application" title="Dashboard" value="Dashboard" href="/"></v-list-item>
          <v-list-item prepend-icon="mdi-bookmark-multiple" title="Slide" value="Slide"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Danh sách quyền" value="Danh sách quyền" href="/module"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <DefaultView/>
    </v-layout>
  </v-card>
</template>

<script setup>
import {ref, onBeforeMount, computed, reactive} from 'vue';
import DefaultView from './View.vue'
import {TokenService} from "@/services/token";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref('')
const path = router.currentRoute.value.name;
const logout = () => {
  TokenService.removeToken();
  window.location.href = '/login';
}


  //
</script>
