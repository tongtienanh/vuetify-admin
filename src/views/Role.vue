<template>
  <div class="pa-5">
    <div>
      <h1 class="mb-10">Thông tin quyền</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Tên quyền *"
            clearable
            variant="underlined"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="description"
            clearable
            variant="underlined"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-table hover fixed-header fixed-footer class="table-role">
        <thead>
        <tr>
          <th class="text-left" style="width: 500px;">
            Name
          </th>
          <th class="text-left">
            Truy cập
          </th>
          <th class="text-left">
            Thêm
          </th>
          <th class="text-left">
            Sửa
          </th>
          <th class="text-left">
            Xóa
          </th>
          <th class="text-left">
            Tất cả
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            Name
          </td>
          <td><v-checkbox></v-checkbox></td>
          <td><v-checkbox></v-checkbox></td>
          <td><v-checkbox></v-checkbox></td>
          <td><v-checkbox></v-checkbox></td>
          <td><v-checkbox></v-checkbox></td>
        </tr>
        </tbody>
        <tfoot>
        <tr class="pa-4">
          <v-btn color="primary" style="transform: translate(1400%, 10px)">Xác nhận</v-btn>
        </tr>
        </tfoot>
      </v-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Role"
}
</script>

<style>
.table-role table {
  padding: 16px 0;
}
</style>
