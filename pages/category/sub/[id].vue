<template>
    <q-page>
      <q-form @submit="submitForm" @reset="resetForm" class="q-gutter-md">
        <q-card flat>
         
          <q-card-section class="row">
            <div class="col-12 p-2">Parent Cateogry
                <q-select 
                v-model="category.parentId" 
                outlined 
                dense 
                lazy-rules
                emit-value
                map-options
                :options="categories"
                label="Parent Category"
                ></q-select>
            </div>

            <div class="col-6 p-2">Category name uz
              <q-input 
              v-model="category.name.uz" 
              label="Category name uz *" 
              outlined 
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
  
            </div>

            <div class="col-6 p-2">Category name ru
              <q-input 
              v-model="category.name.ru" 
              label="Category name ru *" 
              outlined 
              dense 
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
  

          </q-card-section>
  
          <q-card-actions align="right" class="p-[20px]">
            <q-btn label="Saqlash" type="submit" color="primary" />
            <q-btn label="Tozalash" type="reset" color="red"  class="q-ml-sm" />
          </q-card-actions>
  
        </q-card>
      </q-form>
    </q-page>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: "default"
  });
  
  const route = useRoute();
  
  const categoryStore = useCategoryStore();
 await categoryStore.getCategory();
 await categoryStore.getOneCategory(route.params.id as string)
 const { category } = categoryStore;

  const categories = categoryStore.categories.flatMap(cate => ({label:cate.name, value: cate._id}))

  
  const submitForm = async () => {
        categoryStore.updateCategory(category._id as string, category)
  }
  
  const resetForm = () => {
    categoryStore.category = {
    name: {
      uz: "",
      ru: "",
    },
  
    image: "",
    icon: "",
    top_banner: []
  }
  
  }
  
  
  
  
  </script>
  
  <style scoped></style>