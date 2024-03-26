<template>
    <el-menu default-active="1" class="el-menu-vertical">
        <h1>Shop</h1>
        <router-link to="/products" class="menu-item-link">
            <el-menu-item index="1" class="menu-item">
                <el-icon>
                    <ShoppingBag />
                </el-icon>
                <template #title>Products List</template>
            </el-menu-item>
        </router-link>

        <router-link to="/settings" class="menu-item-link">
            <el-menu-item index="2" class="menu-item" router-link to="/settings">
                <el-icon>
                    <Setting />
                </el-icon>
                <template #title>Settings</template>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { ShoppingBag, Setting }  from '@element-plus/icons-vue'

const isCollapse = ref(false)

defineExpose({
    isCollapse,
})
</script>

<style scoped>
.el-menu-vertical,
.el-menu-vertical:not(.el-menu--collapse) {
    height: 100vh;
    border: 1px solid var(--shop-gray-light);
}

h1 {
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--shop-gray-light);
}

.menu-item {
    font-size: var(--font-size-xl);
    font-weight: 400;
}

.menu {
    font-size: var(--font-size-l);
}
</style>