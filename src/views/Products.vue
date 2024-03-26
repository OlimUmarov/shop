<template>
    <div class="products">
        <el-table v-loading="isLoading" :data="products.products" class="table" @row-click="onRowClick">
            <el-table-column prop="title" label="Model" />
            <el-table-column prop="brand" label="Brand" />
            <el-table-column prop="category" label="Category" />
            <el-table-column prop="price" label="Price" />
            <el-table-column prop="rating" label="Rating" />
        </el-table>
        <el-pagination :page-size="10" :pager-count="5" layout="prev, pager, next" :total="products.total"
            v-model:current-page="currentPage" @current-page="onPageClick" />
        <Modal :id="productId" :show="show" :onCloseModal="onCloseModal"/>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import Modal from '../components/Modal.vue';
import { ProductType } from 'src/app/types/products';

const store = useStore();
const products = computed(() => store.state.products);
const isLoading = computed(() => store.state.isLoading);

const currentPage = ref(1);
const show = ref(false);
const productId = ref(1);

watchEffect(() => {
    store.dispatch('getProducts', {
        limit: 10,
        skip: currentPage.value * 10
    });
})

const onRowClick = (row: ProductType) => {
    productId.value = row.id
    show.value = true
}

const onCloseModal = () => {
    show.value = false
}

const onPageClick = (page: number) => {
    currentPage.value = page
}
</script>

<style scoped>
.products {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    background-color: var(--shop-white);
    height: 100%;
    padding: var(--padding-content);
    border-radius: var(--shop-border-main);
}
</style>