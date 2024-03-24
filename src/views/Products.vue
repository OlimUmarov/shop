<template>
   <el-table :data="tableData" class="products">
    <el-table-column prop="name" label="Model" width="180" />
    <el-table-column prop="date" label="Year of release" width="180" />
    <el-table-column prop="address" label="Category" />
    <el-table-column prop="date" label="Price" width="180" />
    <el-table-column prop="date" label="Created date" width="180" />
    <el-table-column prop="address" label="Visible for users" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped>
.products {
    background-color: var(--shop-white);
    height: 100%;
    padding: var(--padding-content);
    border-radius: var(--shop-border-main);
}
</style>