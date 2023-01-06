<template>
  <div class="pa-5">
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="2" class="card-module">
          <v-card-title class="d-flex justify-space-between" style="background: #f3f2f9; color: #000000DE; font-weight: bold;">
            <div>Module</div>
            <v-btn height="30" color="green" class="text-capitalize new-module" style="font-size: 12px; font-weight: 500;">Thêm quyền</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item class="d-flex align-center" id="item-topic">
                  <v-list-item-icon>
                    <v-icon class="pb-2" style="width: 32px; height: 32px">mdi-account-settings-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="ml-3 d-flex justify-space-between" style="width: 100%;">
                    <v-list-item-title style="font-size: 18px;">Quyền admin</v-list-item-title>
                    <div class="d-flex align-center">
                      <v-btn icon width="32" height="32" flat><v-icon>mdi-pencil-outline</v-icon></v-btn>
                      <v-btn icon width="32" height="32" flat><v-icon>mdi-delete-outline</v-icon></v-btn>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="2" class="card-module">
          <v-card-title class="d-flex justify-space-between" style="background: #f3f2f9; color: #000000DE; font-weight: bold;">
            <div>Module</div>
            <v-btn height="30" color="green" class="text-capitalize new-module" outlined style="font-size: 12px; font-weight: 500;">Thêm quyền</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item class="d-flex align-center" id="item-topic">
                  <v-list-item-icon>
                    <v-icon class="pb-2" style="width: 32px; height: 32px">mdi-account-settings-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="ml-3 d-flex justify-space-between" style="width: 100%;">
                    <v-list-item-title style="font-size: 18px;">Quyền admin</v-list-item-title>
                    <div class="d-flex align-center">
                      <v-btn icon width="32" height="32" flat><v-icon>mdi-pencil-outline</v-icon></v-btn>
                      <v-btn icon width="32" height="32" flat><v-icon>mdi-delete-outline</v-icon></v-btn>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Module"
}
</script>

<style>
#item-topic .v-list-item__content {
  display: flex !important;
  align-items: center !important;
  width: 100%;
}
.new-module {
  display: none!important;
}
.card-module:hover .new-module{
  display: block!important;
}

</style>
