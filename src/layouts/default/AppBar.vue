<template>
  <v-app-bar flat style="border-bottom: 1px solid #e9e8e8">
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      Admin
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
          <v-list-item prepend-icon="mdi-application  " title="Dashboard" value="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-bookmark-multiple" title="Slide" value="Slide"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <DefaultView/>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue'

  //
</script>
