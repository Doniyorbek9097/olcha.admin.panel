<template>
    <q-page class="p-5">
        <ElForm ref="ruleFormRef" :model="carousel" :rules="rules" label-width="120px" label-position="top"
            class="demo-ruleForm" :size="$q.screen.md ? 'large' : 'default'" status-icon>

            <p class="text-xl py-2"> O'zbek tilidagi bannerni yuklash uchun bosing</p>
            <ElFormItem prop="image.uz">
                <Uploader v-model="carousel.image.uz">
                    <ElButton>
                        <QIcon name="upload" size="20px"></QIcon>
                        O'zbek tilidagi bannerni yuklash
                    </ElButton>
                </Uploader>
            </ElFormItem>

            <p class="text-xl py-2"> Rus tilidagi bannerni yuklash uchun bosing</p>
            <ElFormItem prop="image.ru">
                <Uploader v-model="carousel.image.ru">
                    <ElButton>
                        <QIcon name="upload" size="20px"></QIcon>
                        Ruscha tilidagi bannerni yuklash
                    </ElButton>
                </Uploader>
            </ElFormItem>

            <ElFormItem prop="slug">
                <el-select v-model="carousel.slug" @change="getCategory"  size="large" filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="Bannerga havola yo'lini ko'rsating">
                    <el-option v-for="item in categories" :key="item._id" :label="item.slug"
                        :value="(item)" />
                </el-select>
            </ElFormItem>

            
            <ElFormItem prop="slug">
                <el-select v-model="carousel.slug" @change="getBrend"  size="large" filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="Bannerga havola yo'lini ko'rsating">
                    <el-option v-for="item in brendStore.brends" :key="item._id" :label="item.slug"
                        :value="(item)" />
                </el-select>
            </ElFormItem>

            <ElFormItem>
                <ElButton @click="submitForm(ruleFormRef)" color="teal">
                    <q-icon name="save" size="20px" />
                    Saqlash
                </ElButton>
                <ElButton @click="$router.back()" color="red">
                    <q-icon name="close" size="20px" />
                    Bekor qilish
                </ElButton>
            </ElFormItem>

        </ElForm>
    </q-page>
</template>
  
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

definePageMeta({
    layout: "default"
});



const categoryStore = useCategoryStore();
const carouselStore = useCarouselStore();
const brendStore = useBrendStore();

await categoryStore.getCategory();
await brendStore.getBrends();

const { categories } = categoryStore;
const { carousel } = carouselStore;

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
    "image.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
    "image.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
    "slug": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],

})



const getCategory = (cate) => {
    carousel.slug = cate.slug;
    carousel.categories = cate._id;
}


const getBrend = (cate) => {
    carousel.slug = cate.slug;
    carousel.brends = cate._id;
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            console.log('submit!')
            await carouselStore.addCarousel(carousel);
        } else {
            console.log('error submit!', fields)
        }
    })
}





</script>
  
<style scoped></style>