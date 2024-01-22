<template>
    <q-page>
      <q-form @submit="submitForm" @reset="resetForm" class="q-gutter-md">
        <q-card>
         
          <q-card-section class="row">
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
  
          <q-card-actions align="right" class="p-[100px]">
            <q-btn label="Saqlash" type="submit" color="primary" />
            <q-btn label="Tozalash" type="reset" color="primary" flat class="q-ml-sm" />
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
  await categoryStore.getOneCategory(route.params.id as string);
  const { category } = categoryStore;
  
  
  const submitForm = async () => {
        categoryStore.updateCategory(category._id as string, category);
  }
  
  const resetForm = () => {
    category = {
    name: {
      uz: "",
      ru: "",
    },
  
    image: "",
    icon: "",
    left_banner: [],
    top_banner: []
  }
  
  }
  
  
  
  
  </script>
  
  <style scoped></style>