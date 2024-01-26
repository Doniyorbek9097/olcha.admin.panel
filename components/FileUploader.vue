<template>
  <q-file 
  v-model="file" 
  @update:model-value="uploader" 
  outlined 
  label="Rasm Yuklash"
  dense 
  lazy-rules
  accept="image/*"
  >
    <template #prepend>
      <q-icon :name="props.icon" />
    </template>

    <template #selected="files">
      {{ props.multiple ? (list.length > 0 ? "Yana Yuklash" :"Rasm Yuklash") : `Rasm yuklandi` }}
    </template>

  </q-file>

  <div v-for="item,index in list">
    <div class="flex items-center justify-between p-3 border-2">
      <p>{{ item.name }}</p>
      <q-icon name="delete" size="20px" color="red"  @click="deleteItem(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "File upload"
  },

  icon: {
    type: String,
    default: "cloud_upload"
  },

 
  required: {
    type: Boolean,
    default: false
  },

  multiple: {
    type: Boolean,
    default: false
  }
  
});

const emits = defineEmits(["result"]);

const file = ref(null);
const list = ref([]);

const uploader = (file:any) => {
  if(props.multiple) {
    list.value.push(file);
    emits("result", list.value)
  }else {
    emits("result", file);
  }

}

const clear = () => {
  emits("result", list.value);

}

const deleteItem = (index: number) => {
    list.value.splice(index, 1);
    emits("result", list.value);

}

</script>

<style lang="scss" scoped>

</style>
