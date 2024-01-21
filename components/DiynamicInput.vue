<template>
<q-item class="flex flex-col items-start">
  <div v-for="item, index in properteis" :key="index">
    <q-item-label  class="q-pl-sm text-lg"> Xususiyat {{ index+1 }} </q-item-label>
    <div class="row ">
        <div class="col-5 q-py-sm">
            <q-input no-error v-model="item.uz.key" label="Xususiyat nomi (o'zbek tilida)" lazy-rules
              required  :rules="[v => !!v || 'required']" outlined dense class="q-pa-xs" />
        </div>

        <div class="col-5 q-py-sm">
            <q-input  v-model="item.uz.value" label="Xususiyat qiymati (o'zbek tilida)" lazy-rules 
                required  :rules="[v => !!v || 'required']" outlined dense class="q-pa-xs" />
        </div>

        <div class="col-5 q-py-sm">
            <q-input no-error v-model="item.ru.key" label="Xususiyat nomi (rus tilida)" lazy-rules
              required  :rules="[v => !!v || 'required']" outlined dense class="q-pa-xs" />
        </div>

        <div class="col-5 q-py-sm">
            <q-input  v-model="item.ru.value" label="Xususiyat qiymati (rus tilida)" lazy-rules  @keyup.once="addRow(index)"
                required  :rules="[v => !!v || 'required']" outlined dense class="q-pa-xs" />
        </div>

        <div class="col-2 q-py-sm">
           <q-icon name="close" color="red" size="md" @click="delRow(index)"/>
        </div>
    </div>
  </div>

</q-item>
</template>

<script setup>
import { reactive } from 'vue';

const properteis = reactive([{
  uz: {
        key:"",
        value:"",
      },

      ru: {
        key:"",
        value:""
      }
}]);

const props = defineProps({
  modelValue: {
    type: Array,
    default: []
  }
});


const emits = defineEmits(['update:modelValue']);

const addRow = () => {
if(properteis.length < 10) {
  emits('update:modelValue', properteis);
  properteis.push({
    uz: {
      key:"",
      value:""
    },

    ru: {
      key:"",
      value:""
    }
  });

 }

}

const delRow = (index) => properteis.splice(index, 1);
</script>

<style lang="scss" scoped>

</style>