<template>
  <q-page class="p-5">
    <QForm class="row" @submit="submitForm">
      <div class="col-6 p-2">
          <QInput v-model="category.name.uz" label="Category o'zbek tilida" outlined dense required autofocus :rules="[rules]"/>
      </div>
      <div class="col-6 p-2">
          <QInput v-model="category.name.ru" label="Category rus tilida" outlined dense required :rules="[rules]"/>
      </div>

      <div class="col-6 p-2 row gap-2">
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
import type { ICategory } from '~/types';
definePageMeta({
  layout: "default"
});


const categoryStore = useCategoryStore();
const router = useRouter();

const { category, loading } = storeToRefs(categoryStore);

const rules = val => val && val.length > 0 || "Iltimos maydoni to'ldiring"; 


const submitForm = async () => {
  const newCatgory = await categoryStore.addCategory(category.value) as ICategory;
      categoryStore.categories.push(newCatgory);
      router.back();
}






</script>

<style scoped></style>