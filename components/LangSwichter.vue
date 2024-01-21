<template>
    <div class="custom-select">
      <select v-model="language" class="max-lg:text-[red]">
      <option
        v-for="item in locales"
        :key="typeof item === 'object' ? item.code : item"
        :value="typeof item === 'object' ? item.code : item"
      >
        {{ typeof item === "object" ? item.name : item }}
      </option>
    </select>
  
    
    </div>
    </template>
  
  <script setup>
  const { locales, locale, setLocale } = useI18n();
  
  const language = computed({
    get: () => locale.value,
    set: (value) => setLocale(value),
  });
  
  
  
  </script>
  
  
  
  <style scoped>
  .custom-select {
    background-color: red;
    color: white;
  }
  
  select {
    appearance: none;
    /* safari */
    -webkit-appearance: none;
    /* other styles for aesthetics */
    width: 100%;
    font-size: 1.15rem;
    padding:1px 5px;
    background-color: transparent;
    /* border: 1px solid #caced1; */
    outline: none;
    border-radius: 0.25rem;
    color: black;
    cursor: pointer;
  }
  
  
  </style>