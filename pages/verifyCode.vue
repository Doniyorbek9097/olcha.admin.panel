<template>
    <q-page class="flex justify-center items-center p-5">
        {{userStore}}    
      </q-page>
  </template>
  
  <script lang="ts" setup>
  definePageMeta({
  layout: "register"
})
  
  const localePath = useLocalePath();
  const userStore = useUserStore();
  
  const user = reactive({});
  
  const submitForm = async () => {
  
  }
 
  
  </script>