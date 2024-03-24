<template>
  <div class="common-layout">
    <el-aside width="200px">
      <Navbar ref="navbar" @updateNavBar="updateNavBar" />
    </el-aside>
    <el-container class="container">
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';

import { ref } from 'vue';
const navbar = ref(null);

const updateNavBar = () => {
  navbar.value.isCollapse = !navbar.value.isCollapse;
}

</script>

<style scoped>
.common-layout {
  display: flex;
}

.header {
  height: var(--navbar-height);
  border-bottom: 1px solid var(--shop-gray-light);
  padding: 0 var(--padding-content);
}

.main {
  background-color: var(--shop-gray-light);
  padding: 25px;
}
</style>