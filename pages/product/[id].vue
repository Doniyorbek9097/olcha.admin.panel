<template>
  <q-page class="p-5">
    <QForm class="row" @submit="submitForm">
      <div class="col-12">
        <QSelect v-model="product.parentCategory" label="Asosiy Category" @update:model-value="selectedParentCategory" :options="parentCategories" emit-value map-options clearable outlined dense :rules="[rules]"/>
      </div>
      <div class="col-12" v-if="subCategories.length">
        <QSelect v-model="product.subCategory" label="O'rta Category" @update:model-value="selectedSubCategory" :options="subCategories" emit-value map-options clearable outlined dense :rules="[rules]" />
      </div>
      <div class="col-12" v-if="childCategories.length">
        <QSelect v-model="product.childCategory" label="Kichik Category" :options="childCategories" emit-value map-options clearable outlined dense :rules="[rules]"/>
      </div>

      <div class="col-6 p-1">
        <QInput v-model="product.name.uz" label="Mahsulotni nomi uzbek tilida" outlined dense  :rules="[rules]"/>
      </div>

      <div class="col-6 p-1">
        <QInput v-model="product.name.ru" label="Mahsulotni nomi rus tilida" outlined dense  :rules="[rules]"/>
      </div>

      <div class="col-12">
        <p>Product tafsif o'zbek tilida</p>
        <CreatePost v-model="product.discription.uz" isEmpty="Iltimos maydoni to'ldiring"/>
      </div>

      <div class="col-12">
        <p>Product tafsif rus tilida</p>
        <CreatePost v-model="product.discription.ru" isEmpty="Iltimos maydoni to'ldiring"/>
      </div>

      <div class="col-12">
        <p>Product Xususiyatlari</p>
        <div class="row" v-for="property, index in product.properteis">
          <div class="col-6 p-1">
            <q-input v-model="property.key.uz" label="Key uzbek tilida" outlined dense required :rules="[rules]"/>
          </div>
          <div class="col-6 p-1">
            <q-input v-model="property.value.uz" label="Value uzbek tilida" outlined dense required :rules="[rules]"/>
          </div>
          
          <div class="col-6 p-1">
            <q-input v-model="property.key.ru" label="Key Rus tilida" outlined dense required :rules="[rules]"/>
          </div>
          <div class="col-6 p-1">
            <q-input v-model="property.value.ru" label="Value Rus tilida" outlined dense required :rules="[rules]"/>
          </div>

          <div class="col-12 py-1">
            <QBtn @click="product.properteis.splice(index, 1)" :label="`${index+1} - Xususiyatni o'chirish`" color="red"/>
          </div>
        </div>
        <QBtn @click="AddPropery" :label="`Xususiyat Qo'shish`" color="blue"/>
      </div>

      <div class="col-12 py-5">
        <p>Product Rasmlari</p>
        <Uploader v-model="product.images" isEmpty="Iltimos maydoni to'ldiring" multiple @delete-image="(path, index) => deleteImage(product._id, path, index)"/>
      </div>

      <div class="col-12">
        <p>Product miqdori</p>
        <QInput type="number" v-model="product.countInStock" outlined dense/>
      </div>

      <div class="col-6 p-1">
        <p>Product asl narxi</p>
        <QInput type="number" v-model="product.orginal_price" outlined dense/>
      </div>

      <div class="col-6 p-1">
        <p>Product sotish narxi</p>
        <QInput type="number" v-model="product.sale_price" outlined dense/>
      </div>

    
      <div class="flex p-2 row gap-2">
        <QBtn type="submit" color="teal" :loading="loading" glossy>
          <q-icon name="save"/>
          Saqlash
        </QBtn>
        <QBtn @click="$router.back()" color="red" glossy>
          <q-icon name="close" />
          Bekor qilish
        </QBtn>
      </div>

    </QForm>
   
  </q-page>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { ICategory, IProduct } from '~/types';
definePageMeta({
  layout: "default"
});

const id = useRoute().params.id as string;
const router = useRouter();

const categoryStore = useCategoryStore();
const brendStore = useBrendStore();
const productStore = useProductStore();

const { data, pending, error } = await useAsyncData("product-edit", async () => {
  const [categories, brends, product] = await Promise.all([
      await categoryStore.getCategory(),
      await brendStore.getBrends(),
      await productStore.getById(id)
   ]);

   return {
     categories,
     brends,
     product
   }
});

const rules = val => val && val.length > 0 || "Iltimos maydoni to'ldiring"; 


const { categories } = categoryStore;
const { brends } = brendStore;
const { product } = productStore;

const parentCategories = ref([]);
const subCategories = ref([]);
const childCategories = ref([]);

parentCategories.value = categories.flatMap(cate => ({
  label: cate.name,
  value: cate._id,
  children:cate.children
}));



const selectedParentCategory = (id: string) => {
  subCategories.value = [];
  childCategories.value = [];
  product.subCategory = null;
  product.childCategory = null;
  subCategories.value = parentCategories.value.flatMap(cate => 
  cate.value == id 
  ? 
  cate.children.flatMap(cate => ({
    label: cate.name,
    value: cate._id,
    children: cate.children
  })) 
  : 
  []);

}

const selectedSubCategory = (id: string) => {
  product.childCategory = null;
  childCategories.value = [];
  childCategories.value = subCategories.value.flatMap(cate => 
  cate.value == id 
  ? 
  cate.children.flatMap(cate => ({
    label: cate.name,
    value: cate._id,
    children: cate.children
  })) 
  : 
  []);
}


const deleteImage  = async (product_id, image_path, index) => {
   const del = await useAPIFetch("/product-image-delete", {
    method:"put",
    body: {
       product_id,
       image_path
    }
   });
   
}

const AddPropery = () => {
  product.properteis?.push({
    key: {
      uz: "",
      ru: ""
    },
    value: {
      uz: "",
      ru: ""
    }
  });

}



const submitForm = async () => {
    await productStore.updateProduct(id, product);
    router.back();
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