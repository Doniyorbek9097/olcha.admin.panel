<template>
    <q-btn flat round dense :icon="grid ? 'apps' : 'list'" class="q-mr-xs" @click="Changed" />
  </template>
  
  <script setup>
  const props = defineProps({
      modelValue:{
          type:Boolean,
          default:false
      }
  });
  
  
  const emits =  defineEmits(["update:modelValue"]);
  const { get, set } = useLocalStorage()
  const grid = ref(false);

  onMounted(() => grid.value = get("isGrid"))
  
  const Changed = () => {
      grid.value = !grid.value;
      emits('update:modelValue', grid.value);
      set('isGrid', grid.value);
  }
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>