<template>
  <div class="mb-200px">
    <MegaMenu v-model="active" :nodes="categories">
      <template #node="{ node }">
          <b class="flex items-center">
          <img :src="node.image" alt="" width="30px">
            {{ node.name }}</b>  
      </template>

      <template #sub="{ sub }">
        <b>{{ sub.name }}</b>
      </template>

      
      <template #child="{ child }">
        {{ child.name }}
      </template>
    </MegaMenu>

    <q-btn @click="active = !active">All Categories</q-btn>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'default',

});

const active = ref(true);

const { categories, getCategory } = useCategoryStore()

getCategory()

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false)




</script>

<style lang="scss" scoped></style>