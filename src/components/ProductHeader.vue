<template>
    <div class="header">
        <el-input v-model="searchValue" class="search" placeholder="Search" >
            <template #append>
                <el-button :icon="Search" @click="onSearch" />
            </template>
        </el-input>
        <el-select-v2 v-model="category" placeholder="Categories" :options="options" class="categories" />
        <el-button type="success" @click="onClickModal" class="button">
            Create
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
    onClickModal: Function,
})

const { onClickModal } = toRefs(props)

const store = useStore();

const options = ref<Array<{ label: string, value: string }>>([])
const categories = computed(() => store.state.categories);
const category = ref('')
const searchValue = ref('')

onMounted(() => {
    store.dispatch('getCategories');
})

watch([categories, category], () => {
    if (categories !== null) {
        options.value = categories.value.map((category: string) => ({
            value: category,
            label: category,
        }))
    }
})

watch(category, () => {
    store.dispatch('getCategory', category.value);
})

const onSearch = () => {
    store.dispatch('getSearchedProducts', searchValue.value);
}

</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
}

.categories {
    width: 200px;
    margin-right: auto;
}

.search {
    width: 200px;
}
</style>