<template>
    <el-dialog v-model="dialogVisible" title="Product" width="500" :before-close="onClickModal">
            <Form :id="id" :onClickModal="onClickModal" :show="show" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch} from 'vue'
import Form from './Form.vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    show: Boolean,
    onClickModal: {
        type: Function,
        required: true
    },
})

const { id, show = false, onClickModal } = toRefs(props)
const dialogVisible = ref(show);

watch(id, () => {
    console.log('id', id.value)
});

</script>