<template>
  <div class="mb-200px">
    <MobileMenu v-model="active" :nodes="categories"/>

    <q-btn @click="active = !active">All Categories</q-btn>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'default',

});

const active = ref(true);

const { categories, getCategory } = useCategoryStore();

getCategory()

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false)




</script>

<style lang="scss" scoped></style>