<template>
  <q-page class="p-5">
    <QForm class="row" @submit="submitForm">
      <div class="col-12 p-2">
        <p>Ota Category</p>
        <QSelect v-model="category.parent" label="Parent Category" :options="options" required emit-value map-options clearable outlined dense :rules="[rules]"/>
      </div>
      <div class="col-12 p-2">
          <p>Category o'zbek tilida</p>
          <QInput v-model="category.name.uz" outlined dense required autofocus :rules="[rules]"/>
      </div>
      <div class="col-12 p-2">
          <p>Category rus tilida</p>
          <QInput v-model="category.name.ru" outlined dense required :rules="[rules]"/>
      </div>

      <div class="col-12 p-2">
        <p>Category SKU</p>
          <QInput v-model="category.slug" label="Category Slug" outlined dense required :rules="[rules]"/>
      </div>

      <div class="col-12 p-2">
          <p>Category Icon</p>
          <Uploader v-model="category.icon" :limit="1"/>
      </div>

      <div class="col-12 p-2">
          <p>Category Image</p>
          <Uploader v-model="category.image" :limit="1"/>
      </div>

      
    
      <div class="col-12 row" v-for="banner, i in category.left_banner">
  
        <div class="p-2 col-6">
          <p>Category left banner o'zbek tilida</p>
          <Uploader v-model="banner.uz" :limit="1"/>
      </div>
      <div class="p-2 col-6">
          <p>Category left banner rus tilida</p>
          <Uploader v-model="banner.ru" :limit="1"/>
      </div>

      <div class="p-2 col-12">
        <QBtn label="Left banner o'chirish" icon="delete" color="red" @click="category.left_banner.splice(i, 1)"/>
      </div>
      </div>

      <div class="col-12 my-5" v-if="!category.left_banner?.length!!">
      <QBtn label="Left banner qo'shish" icon="add" color="green" @click="addToLeftBanner"/>
    </div>
    


      <!-- top banner add  -->
      <div class="col-12 row" v-for="banner, i in category.top_banner">  
        <div class="p-2 col-6">
          <p>Category top banner o'zbek tilida</p>
          <Uploader v-model="banner.uz" :limit="1"/>
      </div>

      <div class="p-2 col-6">
          <p>Category top banner rus tilida</p>
          <Uploader v-model="banner.ru" :limit="1"/>
      </div>

      <div class="p-2 col-12">
        <QBtn label="Top banner o'chirish" icon="delete" color="red" @click="category.top_banner.splice(i, 1)"/>
      </div>
      </div>

      <div class="col-12 my-5" v-if="category.top_banner?.length < 3">
      <QBtn label="Top banner qo'shish" icon="add" color="green" @click="addToTopBanner"/>
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
const router = useRouter();

definePageMeta({
  layout: "default"
});


const id = useRoute().params.id as string;

const categoryStore = useCategoryStore();
 
const {data, pending, error} = await useAsyncData("category-edit", async() => {
  const [categories, category ] = await Promise.all([
    await categoryStore.getCategory(),
    await categoryStore.getOneCategory(id)
  ]);

  return {
    categories,
    category
  }
  
})
   
const { category, categories } = storeToRefs(categoryStore);

const options = categories.value.flatMap(cate => ({
   label: cate.name,
   value: cate._id
}))


const addToLeftBanner = () => {
  category.left_banner!.push({
    image: {
      uz: "",
      ru: ""
    },
    slug: ""
  });
}


const addToTopBanner = () => {
  category.top_banner!.push({
    image: {
      uz: "",
      ru: ""
    },
    slug: ""
  });
}





const submitForm = async () => { 
    await categoryStore.updateCategory(id, category);
    router.back();
}


</script>

<style scoped></style>