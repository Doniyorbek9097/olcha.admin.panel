<template>
  <q-page class="p-5">
    <ElForm ref="ruleFormRef" :model="category" :rules="rules" label-width="120px" label-position="top"
      class="demo-ruleForm" size="large" status-icon>

      <ElFormItem prop="name.uz">
        <ElInput v-model="category.name.uz" placeholder="* Category o'zbek tilida"/>
      </ElFormItem>

      <ElFormItem prop="name.ru">
        <ElInput v-model="category.name.ru" placeholder="* Category rus tilida"/>
      </ElFormItem>

      <ElFormItem>
        <ElButton @click="submitForm(ruleFormRef)" color="lime">
          <q-icon name="save" size="20px"/>
          Saqlash
        </ElButton>
        <ElButton @click="resetForm(ruleFormRef)" color="red">
          <q-icon name="clear" size="20px"/>
          Tozalash
        </ElButton>

      </ElFormItem>


    </ElForm>
  </q-page>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

definePageMeta({
  layout: "default"
});


const id = useRoute().params.id as string;

const categoryStore = useCategoryStore();
await categoryStore.getCategory();
await categoryStore.getOneCategory(id);
const { category } = categoryStore;


const ruleFormRef = ref<FormInstance>();

const rules = reactive({
  "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }]

})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      await categoryStore.updateCategory(id, category);
    } else {
      console.log('error submit!', fields)
    }
  })
}


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}




</script>

<style scoped></style>