<template>
  <q-page class="p-5">
    <ElForm ref="ruleFormRef" :model="product" label-width="120px" label-position="top" class="demo-ruleForm" size="large"
      status-icon>

      <ElFormItem prop="name.uz">
        <ElCascader v-model="categoriesId" :options="options" :props="$q.screen.md && { expandTrigger: 'hover' as const }"
          @change="handleChange" class="w-full" placeholder="Categorylarini tanlash">
          <template #default="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </ElCascader>
      </ElFormItem>

      <ElFormItem prop="name.uz">
        <ElInput v-model="product.name.uz" placeholder="Nomi o'zbek tilida" />
      </ElFormItem>

      <ElFormItem prop="name.ru">
        <ElInput v-model="product.name.ru" placeholder="Nomi rus tilida" />
      </ElFormItem>

      <p>Tafsif o'zbek tilda</p>
      <ElFormItem prop="name.ru">
        <ElCol :span="24">
        <CreatePost v-model="product.discription.uz"></CreatePost>
        </ElCol>
      </ElFormItem>

      <p>Tafsif rus tilida</p>
      <ElFormItem prop="name.ru">
        <ElCol :span="24">
        <CreatePost v-model="product.discription.ru"></CreatePost>
        </ElCol>
      </ElFormItem>

      <p class="py-5">Mahsulot rasmlarini qoshing maxsimal <b>5 ta</b> Ini: <b>450-pixelda</b> va
        <b>bo'yiga:700-pixelda</b> bo'lsin!</p>
      <ElFormItem prop="name.ru">
        <Uploader :limit="5" list-type="picture-card" @result="ProductImagesUpload">
          <q-icon name="upload"></q-icon>
        </Uploader>
      </ElFormItem>

      <p class="py-5">Mahsulot narxi</p>
      <ElFormItem prop="name.ru">
        <el-input v-model="product.price" placeholder="Please input"
          :formatter="(value:string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value:string) => value.replace(/\$\s?|(,*)/g, '')" />
      </ElFormItem>

      
      <p class="py-5">Mahsulot Miqdori</p>
      <ElFormItem prop="name.ru">
        <ElInputNumber v-model="product.countInStock" :min="1"/>
      </ElFormItem>

      <p class="py-5">Mahsulot Chegirmasi</p>
      <ElFormItem prop="name.ru">
        <el-slider v-model="product.discount" size="large" />
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
import type { ICategory, IProduct } from '~/types';
definePageMeta({
  layout: "default"
});


const categoryStore = useCategoryStore();
const productStore = useProductStore();
categoryStore.getCategory();

const { categories } = categoryStore;
const { product } = productStore;

const options = categories.flatMap(parent => {
  return {
    value: parent._id,
    label: parent.name,
    children: parent.children?.flatMap(sub => {
      return {
        value: sub._id,
        label: sub.name,
        children: sub.children?.flatMap(child => {
          return {
            value: child._id,
            label: child.name
          }
        })
      }
    })
  }
})



const categoriesId = ref([]);

const handleChange = (category: string[]) => {
  product.parentCategory = category[0];
  product.subCategory = category[1];
  product.childCategory = category[2];
}



const ProductImagesUpload = async (file: any) => {
    const data = await fileReander(file.raw).catch((err: string) => console.log(err)) as string;
  product.images.push(data);
  console.log(product.images);
  
}



const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],


})




const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      await productStore.addProduct(product);
    } else {
      console.log('error submit!', fields)
    }
  })
}











</script>

<style>
/* Mobil uchun moslashgan stil (style) */

@media not (min-width:768px) {
  .el-cascader-panel {
    max-width: 100%;
    height: 0% !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .el-cascader-menu__wrap.el-scrollbar__wrap {
    height: 100% !important;
    min-width: 300px !important;
  }

}
</style>