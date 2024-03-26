<template>
    <el-form @submit="onSubmit">
        <el-form-item label="Model">
            <el-input type="text" v-model="model" v-bind="modelAttrs" />
            <span v-if="errors.model" class="error">{{ errors.model }}</span>
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
        <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">
                Create
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref, toRefs, watchEffect, computed } from 'vue'
import { useStore } from 'vuex';
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useForm } from 'vee-validate';
import schema from '../helpers/yup';
import { Plus } from '@element-plus/icons-vue'
import { ProductType } from 'src/app/types/products';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
})

const { id } = toRefs(props)
const store = useStore();
const imageUrl = ref('')

const product = computed(() => {
    console.log('data', store.state.product);
    return store.state.product
});

watchEffect(() => {
    store.dispatch('getProduct', id.value);
})

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
        model: product ? product.value.title : '',
        releaseYear: '',
        category: '',
        price: '',
        description: '',
        visiable: '',
        image: '',
    }
});

const [model, modelAttrs] = defineField('model');
const [releaseYear, releaseYearAttrs] = defineField('releaseYear');
const [category, categoryAttrs] = defineField('category');
const [price, priceAttrs] = defineField('price');
const [description, descriptionAttrs] = defineField('description');
const [visiable, visiableAttrs] = defineField('visiable');
const [image, imageAttrs] = defineField('image');

const onSubmit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2));
});

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    z-index: 1;
}

.error {
    height: 14px;
    font-size: 12px;
    color: var(--shop-red);
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>