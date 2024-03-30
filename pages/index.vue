<template>
 <q-page>
  <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    {{ name }}
     <Uploader v-model="name" multiple/>


      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
 </q-page>
</template>
<script setup>
definePageMeta({
  layout: 'default'
});

const name = ref("")

const name1 = ref("")



</script>

<style lang="scss" scoped></style>