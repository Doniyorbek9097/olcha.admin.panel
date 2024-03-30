<template>
  <q-page class="p-5">
    <QForm class="row" @submit="submitForm">
      <div class="col-12 p-2">
        <QSelect v-model="category.parent" label="Parent Category" :options="options" required emit-value map-options clearable outlined dense :rules="[rules]"/>
      </div>
      <div class="col-6 p-2">
          <QInput v-model="category.name.uz" label="Category o'zbek tilida" outlined dense required :rules="[rules]"/>
      </div>
      <div class="col-6 p-2">
          <QInput v-model="category.name.ru" label="Category rus tilida" outlined dense required :rules="[rules]"/>
      </div>
      
      <div class="col-6 p-2 row gap-2">
        <QBtn type="submit" color="teal" :loading="loading" glossy>
          <q-icon name="save"/>
          Saqlash
        </QBtn>

        <QBtn type="button" @click="$router.back()" color="red" glossy>
          <q-icon name="close" />
          Bekor qilish
        </QBtn>
      </div>

    </QForm>
  </q-page>
</template>

<script setup lang="ts">
import type { ICategory } from '~/types';

definePageMeta({
  layout: "default"
});



const categoryStore = useCategoryStore();
await categoryStore.getCategory();

const { category, categories, loading } = storeToRefs(categoryStore);

const router = useRouter();

const rules = val => val && val.length > 0 || "Iltimos maydoni to'ldiring"; 

const options = categories.value.flatMap(cate => ({
   label: cate.name,
   value: cate._id
}))


const submitForm = async () => {
  const newCatgory = await categoryStore.addCategory(category.value) as ICategory;
      categoryStore.categories.push(newCatgory);
      router.back();
}


</script>

<style scoped></style>