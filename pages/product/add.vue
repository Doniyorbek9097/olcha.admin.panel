<template>
  <q-page>
    <q-form class="row p-5" @submit="submitForm" @reset="resetForm">
      <div class="col-12 p-2">Parent Cateogry
        <q-select 
        v-model="product.parentCategory" 
        @update:model-value="ParentCategory" 
        outlined dense lazy-rules emit-value map-options
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        :options="parent_categories" label="Parent Category" />
      </div>

      <div class="col-12 p-2">Sub Cateogry
        <q-select 
        v-model="product.subCategory" 
        @update:model-value="SubCategory" 
        outlined dense lazy-rules emit-value map-options
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        :options="sub_categories" label="Sub Category" />
      </div>

      <div class="col-12 p-2">Child Cateogry
        <q-select 
        v-model="product.childCategory" 
        outlined dense lazy-rules emit-value map-options
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        :options="child_categories" label="Child Category" />
      </div>


      <div class="col-6 p-2">Product nomi (uzbekcha)
        <q-input v-model="product.name.uz" label="Product name" outlined dense/>
      </div>

      <div class="col-6 p-2">Product nomi (ruscha)
        <q-input v-model="product.name.ru" label="Product name" outlined dense/>
      </div>

      <div class="col-12 p-2">Product tavsif (o'zbekcha)
        <CreatePost  v-model="product.discription.uz"/>
      </div>

      <div class="col-12 p-2">Product tavsif (ruscha)
        <CreatePost  v-model="product.discription.ru"/>
      </div>
  
      <div class="col-12 p-2">Product rasmlarni yuklash
         <FileUploader @result="ProductImagesUpload" />
      </div>

      <div class="col-12 p-2">Product narxi
        <q-input class="col-6" v-model="product.price" type="number" outlined label="Product price" dense />
      </div>

      <div class="col-12 p-2">Product miqdori
        <q-input class="col-6" v-model="product.countInStock" type="number" outlined label="Product miqdori" dense />
      </div>

      
      
      <div class="col-12 p-10 row gap-2">
      <q-btn type="submit" color="blue" label="Saqlash"/>
      <q-btn type="reset" color="red">Tozalash</q-btn>
      </div>
      
    </q-form>
  </q-page>

</template>

<script setup lang="ts">
import type { ICategory, IProduct } from '~/types';

definePageMeta({
  layout: "default"
});


const categoryStore = useCategoryStore();
const productStore = useProductStore();
categoryStore.getCategory();

const product = ref<IProduct>({
        name: {
            uz: "",
            ru: ""
        },
        discription: {
            uz: "",
            ru: ""
        },
        properteis: [
            {
                uz: "",
                ru: ""
            }
        ],

        isPropery: false,
        price: null,
        countInStock: null,
        parentCategory: "",
        subCategory: "",
        childCategory: "",
        shop: "",
        colors: [],
        images: [],
        // size: [],
        isDiscount: false,
        discount: null,
        // country: "",

    });

const parent_categories = ref([]);
const sub_categories = ref([]);
const child_categories = ref([]);

parent_categories.value = categoryStore.categories.flatMap((cate: ICategory) => ({ label: cate.name, value: cate._id }));

const ParentCategory = (id:string) => {
  sub_categories.value = categoryStore.subCategories.flatMap((cate: ICategory) => cate.parentId == id ? { label: cate.name, value: cate._id } : null);
}

const SubCategory = (id:string) => {
  child_categories.value = categoryStore.childCategories.flatMap((cate: ICategory) => cate.parentId == id ? { label: cate.name, value: cate._id } : null);
}


const ProductImagesUpload = (files: any) => {
const images = ref([])
  for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      images.value.push(file);
    })
  }

  product.value.images = images.value;
}


// const ProductColorsUpload = (files: never) => {
//   console.log(files)
// }


const submitForm = async () => {
    await productStore.addProduct(product.value);

      product.value = {
        name: {
            uz: "",
            ru: ""
        },
        discription: {
            uz: "",
            ru: ""
        },
        properteis: [
            {
                uz: "",
                ru: ""
            }
        ],

        isPropery: false,
        price: null,
        countInStock: 0,
        parentCategory: "",
        subCategory: "",
        childCategory: "",
        shop: "",
        colors: [],
        images: [],
        // size: [],
        isDiscount: false,
        discount: null,
        // country: "",

    } 
}

const resetForm = () => {
  product.value = {
        name: {
            uz: "",
            ru: ""
        },
        discription: {
            uz: "",
            ru: ""
        },
        properteis: [
            {
                uz: "",
                ru: ""
            }
        ],

        isPropery: false,
        price: null,
        countInStock: 0,
        parentCategory: "",
        subCategory: "",
        childCategory: "",
        shop: "",
        colors: [],
        images: [],
        // size: [],
        isDiscount: false,
        discount: null,
        // country: "",

    } 
}






</script>

<style scoped></style>