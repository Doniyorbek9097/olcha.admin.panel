<template>
  <q-page class="p-5">
    <ElForm v-if="!pending" ref="ruleFormRef" :model="product" label-position="top" :rules="rules" class="demo-ruleForm" status-icon>

      <ElFormItem prop="parentCategory" label="Asosiy Category">
        <ElCol :span="24">
          <el-select v-model="product.parentCategory" filterable default-first-option :reserve-keyword="false"
            placeholder="Asosiy Category" @change="selectedParentCategory">
            <el-option v-for="item in categories" :key="item._id" :label="(item.name)" :value="(item._id as string)" />
          </el-select>
        </ElCol>
      </ElFormItem>


      <ElFormItem prop="subCategory" v-if="sub_categories.length" label="O'rta Category">
        <ElCol :span="24">
          <el-select v-model="product.subCategory" filterable allow-create default-first-option :reserve-keyword="false"
            placeholder="O'rta Category" @change="selectedSubCategory">
            <el-option v-for="item in sub_categories" :key="item._id" :label="item.name"
              :value="(item._id as string)" />
          </el-select>
        </ElCol>
      </ElFormItem>


      <ElFormItem prop="childCategory" v-if="child_categories.length" label="Kichik Category">
        <ElCol :span="24">
          <el-select v-model="product.childCategory" filterable allow-create default-first-option
            :reserve-keyword="false" placeholder="Kichik Category">
            <el-option v-for="item in child_categories" :key="item._id" :label="item.name"
              :value="(item._id as string)" />
          </el-select>
        </ElCol>
      </ElFormItem>

      <ElFormItem prop="brend" label="Mahsulot brendini tanlang">
        <ElCol :span="24">
          <el-select v-model="product.brend" filterable allow-create default-first-option :reserve-keyword="false"
            placeholder="Mahsulot brendini tanlang">
            <el-option v-for="item in brends" :key="item._id" :label="item.slug"
              :value="(item._id as string)" />
          </el-select>
        </ElCol>
      </ElFormItem>

      <ElFormItem prop="name.uz" label="Nomi o'zbek tilida">
        <ElInput v-model="product.name.uz" placeholder="Nomi o'zbek tilida" />
      </ElFormItem>

      <ElFormItem prop="name.ru" label="Nomi rus tilida">
        <ElInput v-model="product.name.ru" placeholder="Nomi rus tilida" />
      </ElFormItem>

      <ElFormItem prop="discription.uz" label="Tafsif o'zbek tilda">
        <ElCol :span="24">
          <CreatePost v-model="product.discription.uz"></CreatePost>
        </ElCol>
      </ElFormItem>

      <ElFormItem prop="discription.ru" label="Tafsif rus tilida">
        <ElCol :span="24">
          <CreatePost v-model="product.discription.ru"></CreatePost>
        </ElCol>
      </ElFormItem>

      <ElFormItem label="Mahsulot Xususiyatlarini qo'shish">
        <ElRow :gutter="12" v-for="property, i in product.properteis">
          <ElCol :span="24">Xususiyat {{ i + 1 }}</ElCol>
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

      <ElFormItem prop="images" label="Mahsuloting barcha rasmlarni yuklash">
        <Uploader v-model="product.images" :limit="5" multiple>
          <ElButton><q-icon name="upload"></q-icon>Mahsulot rasmlarni yuklash</ElButton>
        </Uploader>
      </ElFormItem>


      <ElFormItem prop="orginal_price" label="Mahsulotning asl narxi">
        <el-input type="tel" v-model="product.orginal_price" placeholder="Mahsulotning asl narxi"
          :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')" />
      </ElFormItem>

      <ElFormItem prop="sale_price" label="Mahsulotning sotish narxi">
        <el-input type="tel" v-model="product.sale_price" placeholder="Mahsulotning sotish narxi"
          :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')" />
      </ElFormItem>


      <ElFormItem prop="countInStock" label="Mahsulot Miqdori">
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


const categoryStore = useCategoryStore();
const brendStore = useBrendStore();
const productStore = useProductStore();
await productStore.Reset();

const { data, pending, error } = await useAsyncData("product-add", async () => {
  const [categories, brends] = await Promise.all([
      await categoryStore.getCategory(),
      await brendStore.getBrends()
   ]);

   return {
     categories,
     brends
   }
});


const { categories } = categoryStore;
const { brends } = brendStore;
const { product } = productStore;

const sub_categories = ref<ICategory[]>([]);
const child_categories = ref<ICategory[]>([]);


const selectedParentCategory = (id: string) => {
  sub_categories.value = categories.flatMap(cate => cate._id == id ? cate.children : []) as ICategory[];
  child_categories.value = [];
}

const selectedSubCategory = (id: string) => {
  child_categories.value = sub_categories.value.flatMap(cate => cate._id == id ? cate.children : []) as ICategory[];

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




const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  "parentCategory": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
  "subCategory": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
  "childCategory": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
  "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "discription.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "discription.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "images": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "change" }],
  "orginal_price": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "sale_price": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "countInStock": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }]

})




const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      await productStore.addProduct(product);
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