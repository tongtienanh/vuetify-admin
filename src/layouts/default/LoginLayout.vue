<template>
  <v-app>
    <v-app-bar flat style="border-bottom: 1px solid #e9e8e8">
      <v-app-bar-title>
        <v-icon icon="mdi-circle-slice-6"/>
        Login
      </v-app-bar-title>
    </v-app-bar>
   <div>
     <v-main style="height: 100vh;padding-top: 65px;">
       <div class="px-5">
         <router-view/>
       </div>
     </v-main>
   </div>
  </v-app>
</template>

<script>
export default {
  name: "LoginLayout"
}
</script>

<style scoped>

</style>
