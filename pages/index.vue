<script setup>
import { useQuasar } from "quasar";
const userStore = useUserStore();
const carouselStore = useCarouselStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const brendStore = useBrendStore();
const $q = useQuasar();

definePageMeta({
    layout: "default",
})

const { data, pending, error, status } = await useLazyAsyncData("home", async () => {
    const [categories, products, carouseles, brends, cart, users] = await Promise.all([
        categoryStore.getCategory(`?limit=${8}`),
        productStore.getProducts(),
        carouselStore.getCarousel(),
        brendStore.getBrends(),
        cartStore.getCart(),
        userStore.GetUser()
    ])

    return {
        categories,
        products,
        carouseles,
        brends,
        cart,
        users
    }
})

</script>

<template>
 <q-page>
  <p>Asosiy Sahifa </p>
 </q-page>
</template>

<style lang="scss" scoped></style>