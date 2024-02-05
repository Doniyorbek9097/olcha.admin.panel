<template>
    <q-page class="p-5">
      <ElForm ref="ruleFormRef" :model="product" label-width="120px" label-position="top" :rules="rules"
        class="demo-ruleForm" status-icon>
  
        <ElFormItem prop="parentCategory">
          <ElCascader v-model="categoriesId" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"
            class="w-full" placeholder="Categorylarini tanlash">
            <template #default="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </ElCascader>
        </ElFormItem>

        <ElFormItem prop="brend">
        <ElCol :span="24">
            <el-select v-model="product.brend" filterable allow-create default-first-option :reserve-keyword="false"
              placeholder="Mahsulot brendini tanlang">
              <el-option v-for="item in brendStore.brends" :key="item._id" :label="item.slug" :value="(item._id as string)" />
            </el-select>
          </ElCol>
      </ElFormItem>

  
        <ElFormItem prop="name.uz">
          <ElInput v-model="product.name.uz" placeholder="Nomi o'zbek tilida" />
        </ElFormItem>
  
        <ElFormItem prop="name.ru">
          <ElInput v-model="product.name.ru" placeholder="Nomi rus tilida" />
        </ElFormItem>
  
        <p>Tafsif o'zbek tilda</p>
        <ElFormItem prop="discription.uz">
          <ElCol :span="24">
            <CreatePost v-model="product.discription.uz"></CreatePost>
          </ElCol>
        </ElFormItem>
  
        <p>Tafsif rus tilida</p>
        <ElFormItem prop="discription.ru">
          <ElCol :span="24">
            <CreatePost v-model="product.discription.ru"></CreatePost>
          </ElCol>
        </ElFormItem>
  
  
        <p class="text-xl">Mahsulot Xususiyatlarini qo'shish</p>
        <ElFormItem prop="countInStock">
          <ElRow :gutter="12" v-for="property, i in product.properteis">
            <ElCol :span="24">Xususiyat {{ i+1 }}</ElCol>
            <ElCol :span="12">
              <ElInput v-model="property.uz.key" placeholder="O'zbekcha key"></ElInput>
              <ElInput v-model="property.ru.key" placeholder="Ruscha key"></ElInput>
            </ElCol>
            <ElSpace direction="horizontal" size="large"></ElSpace>
            <ElCol :span="12">
              <ElInput v-model="property.uz.value" placeholder="O'zbekcha value"></ElInput>
              <ElInput v-model="property.ru.value" placeholder="Ruscha value"></ElInput>
            </ElCol>
                <ElButton class="my-5" color="red" @click="product.properteis?.splice(i, 1)">Xususiyat o'chirish</ElButton>
          </ElRow>
            <ElButton class="my-5" @click="AddPropery">Xususiyat qo'shish</ElButton>
        </ElFormItem>
  
  
        <p class="py-5">Mahsulotning to'liq narxi</p>
      <ElFormItem prop="orginal_price">
        <el-input v-model="product.orginal_price"
          :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')" />
      </ElFormItem>

      <p class="py-5">Mahsulotning sotish narxi</p>
      <ElFormItem prop="sale_price">
        <el-input v-model="product.sale_price"
          :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')" />
      </ElFormItem>

  
        <p class="py-5">Mahsulot Miqdori</p>
        <ElFormItem prop="countInStock">
          <ElInputNumber v-model="product.countInStock" :min="1" />
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
  
  const id = useRoute().params.id as string;

  const categoryStore = useCategoryStore();
  const brendStore = useBrendStore();
  const productStore = useProductStore();
  await categoryStore.getCategory();
  await brendStore.getBrends();
  await productStore.getById(id);
  
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
  
  const AddPropery = () => {
    product.properteis?.push({
      uz: {
        key: "",
        value: ""
      },
      ru: {
        key: "",
        value: ""
      }
    });
  
  }
  
  
  const ProductImagesUpload = async (file: any) => {
    const data = await fileReander(file.raw).catch((err: string) => console.log(err)) as string;
    product.images.push(data);
  
  }
  
  
  
  const ruleFormRef = ref<FormInstance>()
  
  const rules = reactive({
    "parentCategory": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
    "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "discription.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "dicription.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "images": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
    "original_price": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "sale_price": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "countInStock": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }]
  
  })
  
  
  
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!')
        await productStore.updateProduct(id, product);
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
      display: flex !important;
      flex-direction: column !important;
      z-index: 999 !important;
    }
  
    .el-cascader-menu__wrap.el-scrollbar__wrap {
      height: 100% !important;
      min-width: 300px !important;
      z-index: 999 !important;
  
    }
  
  }
  </style>