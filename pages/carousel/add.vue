<template>
    <q-page>
        <q-form class="row" @submit="submitForm" @reset="resetForm">
            <div class="col-6 p-2">Banner uz
                <AdminFileUploader @result="ImageUz"/>
            </div>

            <div class="col-6 p-2">Banner ru
                <AdminFileUploader @result="ImageRu"/>
            </div>
            <div class="col-12 p-2">Banner path link
                <q-input v-model="carousel.slug" label="/path"/>
            </div>

            <div class="col-12 p-2 row gap-2">
                <q-btn type="submit" color="primary" icon="check" label="Saqlash" />
                <q-btn type="reset" color="red" icon="check" label="Tozalash" />
            </div>
        </q-form>
    </q-page>
</template>
  
<script setup lang="ts">
import type { ICarousel } from '~/types';
const categoryStore = useCategoryStore();
const carouselStore = useCarouselStore();

definePageMeta({
    layout: "default"
});


const carousel = reactive<ICarousel>({
    image: {
        uz: "",
        ru: ""
    },

    slug: ""
})


const ImageUz = (files: any) => {
    for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      carousel.image.uz = file;
    })
  }
    
}


const ImageRu = (files: any) => {
    for (const file of files) {
    fileReander(file, (err: string, file: string): void => {
      if (err) return console.log(err);
      carousel.image.ru = file;
    })
  }
}


const submitForm = async () => {
    carouselStore.addCarousel(carousel)
}

const resetForm = () => {
    
}






</script>
  
<style scoped>

</style>