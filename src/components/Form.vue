<template>
    <el-form @submit="onSubmit" :loading="isLoading">
        <el-form-item label="Model">
            <el-input type="text" v-model="title" v-bind="titleAttrs" />
            <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </el-form-item>
        <el-form-item label="Year of release">
            <el-date-picker type="date" v-model="releaseYear" v-bind="releaseYearAttrs" placeholder="Pick a date" />
            <span v-if="errors.releaseYear" class="error">{{ errors.releaseYear }}</span>
        </el-form-item>
        <el-form-item label="Category">
            <el-select-v2 placeholder="Categories" v-model="category" v-bind="categoryAttrs" :options="options" />
            <span v-if="errors.category" class="error">{{ errors.category }}</span>
        </el-form-item>
        <el-form-item label="Recommended price">
            <el-input type="number" v-model="price" v-bind="priceAttrs" />
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
        </el-form-item>
        <el-form-item label="Description">
            <el-input type="textarea" v-model="description" v-bind="descriptionAttrs" />
        </el-form-item>
        <el-form-item label="Visiable" prop="delivery">
            <el-checkbox v-model="visiable" v-bind="visiableAttrs" />
        </el-form-item>
        <div class="avatar-uploader">
            <input type="file" @change="handleFileChange" accept="image/*" class="input" />
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Picture />
            </el-icon>
            <el-icon class="icon">
                <Plus />
            </el-icon>
        </div>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">
                {{ id ? 'Update' : 'Create' }}
            </el-button>
            <el-button v-if="id" type="danger" @click="onDelete">
                Delete
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, watchEffect } from 'vue'
import { useStore } from 'vuex';
import schema from '../helpers/yup';
import { useForm } from 'vee-validate';
import { Plus, Picture } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { ElMessageBox } from 'element-plus'


const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    onClickModal: {
        type: Function,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    }
})

const { id, onClickModal, show } = toRefs(props)
const store = useStore();

const imageUrl = ref('')
const options = ref<Array<{ label: string, value: string }>>([])

const product = computed(() => store.state.product);
const isLoading = computed(() => store.state.isLoading);
const notification = computed(() => store.state.notification);
const categories = computed(() => store.state.categories);

watchEffect(() => {
    if (id.value !== 0) {
        store.dispatch('getProduct', id.value);
    }
    if(categories.value.length === 0) {
        store.dispatch('getCategories');
    }
    if(!show.value) {
        onResetForm()
    }
})

watch([product, categories, notification.value, id], () => {
    if (product.value && id.value !== 0) {
        resetForm({
            values: {
                title: product.value.title,
                releaseYear: '2024-03-11T19:00:00.000Z',
                category: product.value.category,
                price: product.value.price,
                description: product.value.description,
                visiable: true,
            }
        })
        imageUrl.value = product.value.images[0]
    } else {
        onResetForm()
    }
    if (categories !== null) {
        options.value = categories.value.map((category: string) => ({
            value: category,
            label: category,
        }))
    }
})

const { errors, handleSubmit, defineField, resetForm } = useForm({
    validationSchema: schema,
});

const [title, titleAttrs] = defineField('title');
const [releaseYear, releaseYearAttrs] = defineField('releaseYear');
const [category, categoryAttrs] = defineField('category');
const [price, priceAttrs] = defineField('price');
const [description, descriptionAttrs] = defineField('description');
const [visiable, visiableAttrs] = defineField('visiable');

const onNotifyClick = () => {
    if (notification.value.message.length > 0) {
        ElNotification({
            title: notification.value.title,
            message: notification.value.message,
            type: 'success',
            position: 'top-left'
        })
        onClickModal.value();
        onResetForm()
    }
}

const handleFileChange = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
        imageUrl.value = URL.createObjectURL(file);
    }
};

const onSubmit = handleSubmit(values => {
    if (id.value !== 0) {
        store.dispatch('updateProduct', {
            id: id.value,
            body: {
                images: [imageUrl.value],
                ...values
            }
        })
        onNotifyClick();
    } else {
        store.dispatch('createProduct', {
            ...values,
            images: [imageUrl.value]
        })
        onNotifyClick();
    }
});

const onDelete = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to delete this product?')
        .then(() => {
            store.dispatch('deleteProduct', id.value);
            onNotifyClick();
            done()
        })
        .catch(() => {
            console.log('error');
        })
}

const onResetForm = () => {
    resetForm({
        values: {
            title: '',
            releaseYear: '',
            category: '',
            price: '',
            description: '',
            visiable: true,
        }
    })
    imageUrl.value = ''
}

</script>

<style scoped lang="scss">
.avatar-uploader {
    position: relative;
    width: 178px;
    height: 178px;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    overflow: hidden;
    margin: 10px 0;

    &:hover {
        .icon {
            display: grid;
            place-content: center;
        }

        .avatar-uploader-icon {
            display: none;
        }
    }

}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
    z-index: 1;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.icon {
    display: none;
    position: absolute;
    width: 178px;
    height: 178px;
    top: 0;
    left: 0;
    color: var(--shop-white);
    border-color: var(--el-color-primary);
    background-color: rgb(0, 0, 0, 0.4);
    z-index: 1;

    svg {
        width: 40px;
        height: fit-content;
    }
}

.input {
    position: absolute;
    width: 178px;
    height: 178px;
    font-size: 0;
    z-index: 2;
    opacity: 1;
    opacity: 0;
    cursor: pointer;
}

.error {
    height: 14px;
    font-size: 12px;
    color: var(--shop-red);
}
</style>