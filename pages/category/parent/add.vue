<template>
  <q-page>
    <q-form @submit="submitForm" @reset="resetForm" class="q-gutter-md">
      <q-card flat>
        <q-card-section class="row">
          <div class="col-6 p-2">Category name uz
            <q-input v-model="category.name.uz" label="Category name uz *" outlined dense lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

          </div>
          <div class="col-6 p-2">Category name ru
            <q-input v-model="category.name.ru" label="Category name ru *" outlined dense lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
          </div>

          <div class="col-12 p-2">Categoryga rasm qo'yish
            <FileUploader @result="Image" label="Image" />
          </div>

          <!-- left banner add  -->
          <div class="col-12">
            <div class="row" v-for="banner, i in category.left_banner">

              <div class="col-6 p-2">Left banner uz
                <FileUploader @result="(files) => LeftImageUz(files, i)" label="Banner uz" />
              </div>

              <div class="col-6 p-2">Left banner ru
                <FileUploader @result="(files) => LeftImageRu(files, i)" label="Banner ru" />
              </div>

              <div class="col-12 p-2">Left banner slug
                <q-input v-model="banner.slug" label="/path" outlined dense />
              </div>

              <div class="col-12 row justify-end">
                <q-btn @click="category.left_banner?.splice(i, 1)" color="red" icon="delete"
                  label="Left banner o'chirish" />
              </div>

            </div>
            <q-btn v-if="!category.left_banner?.length" @click="addToLeftBanner" icon="add" class="mt-2" color="blue"
              label="Left banner qo'shish" />
          </div>

          <!-- top banner add  -->
          <div class="col-12">
            <div class="row" v-for="banner, i in category.top_banner">

              <div class="col-6 p-2">Top banner uz
                <FileUploader @result="(files) => TopImageUz(files, i)" label="Banner uz" />
              </div>

              <div class="col-6 p-2">Top banner ru
                <FileUploader @result="(files) => TopImageRu(files, i)" label="Banner ru" />
              </div>

              <div class="col-12 p-2">Top banner slug
                <q-input v-model="banner.slug" label="/path" outlined dense />
              </div>

              <div class="col-12 row justify-end">
                <q-btn @click="category.top_banner?.splice(i, 1)" color="red" label="o'chirish" />
              </div>

            </div>
            <q-btn @click="addToTopBanner" class="mt-2" color="blue" label="Top banner qo'shish" />
          </div>

        </q-card-section>

        <q-card-actions class="p-[20px]">
          <q-btn label="Saqlash" type="submit" color="primary" :loading="categoryStore.isLoading"
            :disable="categoryStore.isLoading" />
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


const categoryStore = useCategoryStore();
const { category } = categoryStore;


const Image = (files: any) => {
  for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      category.image = file;
    })
  }

}

const LeftImageUz = (files: any, index: number) => {
  for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      category.left_banner![index].image.uz = file;
    })
  }
}

const LeftImageRu = (files: any, index: number) => {
  for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      category.left_banner![index].image.ru = file;
    })
  }
}


const TopImageUz = (files: any, index: number) => {
  for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      category.top_banner![index].image.uz = file;
    })
  }
}


const TopImageRu = (files: any, index: number) => {
  for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      category.top_banner![index].image.ru = file;
    })
  }
}





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
  await categoryStore.addCategory(category);
}

const resetForm = () => {
  categoryStore.category = {
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