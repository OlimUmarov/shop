<template>
    <el-dialog v-model="dialogVisible" title="Product" width="500" :before-close="handleClose">
            <Form :id="id" />
        <template #footer>
            <div class="dialog-footer">
                <!-- <el-button @click="onCloseModal">Cancel</el-button>
                <el-button type="primary" @click="onCloseModal">
                    Confirm
                </el-button> -->
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs} from 'vue'
import { ElMessageBox } from 'element-plus'
import Form from './Form.vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    show: Boolean,
    onCloseModal: Function,
})

const { id, show = false, onCloseModal } = toRefs(props)
const dialogVisible = ref(show)

// const handleClose = (done: () => void) => {
//     ElMessageBox.confirm('Are you sure to close this dialog?')
//         .then(() => {
//             done()
//         })
//         .catch(() => {
//             // catch error
//         })
// }
</script>