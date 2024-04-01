<template>
    <q-page class="p-5">
        <QForm class="row" @submit.prevent="submitForm">
            <div class="col-12">
                <p class="text-xl py-2"> O'zbek tilidagi bannerni yuklash uchun bosing</p>
                <Uploader v-model="carousel.image.uz" isEmpty="Iltimos maydoni to'ldiring" required/>
            </div>
            <div class="col-12">
                <p class="text-xl py-2"> Rus tilidagi bannerni yuklash uchun bosing</p>
                <Uploader v-model="carousel.image.ru" isEmpty="Iltimos maydoni to'ldiring" required/>
            </div>

            <div class="col-12">
                <p class="text-xl py-2"> bannerning havola yo'lini kiriting</p>
                <QInput v-model="carousel.slug" dense outlined placeholder="URL" required :rules="[rules]"/>
            </div>
        <div class="col-12 row gap-2 mt-4">
            <QBtn type="submit" color="teal" :loading="loading">
                    <q-icon name="save" size="20px" />
                    Saqlash
            </QBtn>
                <QBtn type="button" @click="$router.back()" color="red">
                    <q-icon name="close" size="20px" />
                    Bekor qilish
                </QBtn>

        </div>
                    
        </QForm>
        
    </q-page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default"
});



const categoryStore = useCategoryStore();
const carouselStore = useCarouselStore();
const brendStore = useBrendStore();
const productStore = useProductStore();
const $q = useQuasar();
const router = useRouter();

const { data, pending, error } = await useLazyAsyncData("carousel-add", async () => {
    const [categories, brends] = await Promise.all([
        await categoryStore.getCategory(),
        await brendStore.getBrends(),
        await productStore.getProducts()
     ]);

     return {
        categories,
        brends
     }
  })



const { categories } = categoryStore;
const { carousel, loading } = storeToRefs(carouselStore);

const rules = val => val && val.length > 0 || "Iltimos maydoni to'ldiring"; 


const addLoading = ref(false);
const submitForm = async () => {
    try {
        await carouselStore.addCarousel(carousel.value);
        router.back();
    } catch (error) {
        console.log(error);
        
    }

}





</script>

<style scoped></style>