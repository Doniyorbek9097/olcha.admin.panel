<template>
  <q-page class="p-5">
    <ElForm ref="ruleFormRef" :model="category" :rules="rules" label-width="120px" label-position="top"
      class="demo-ruleForm" size="large" status-icon>

      <ElFormItem prop="name.uz">
        <ElInput v-model="category.name.uz" placeholder="Category o'zbek tilida"/>
      </ElFormItem>

      <ElFormItem prop="name.ru">
        <ElInput v-model="category.name.ru" placeholder="Category rus tilida"/>
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
import type { FormInstance, FormRules } from 'element-plus'
import type { ICategory } from '~/types';


definePageMeta({
  layout: "default"
});



const categoryStore = useCategoryStore();
const { category, subCategories, childCategories } = categoryStore;
await categoryStore.getCategory();

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "image": [{ required: true, message: "Iltimos rasmni yuklang", trigger: "change" }],

  "left_banner.0.image.uz": [{ required: true, message: "Iltimos banner yuklang", trigger: "change" }],
  "left_banner.0.image.ru": [{ required: true, message: "Iltimos banner yuklang", trigger: "change" }],
  "left_banner.0.slug": [{ required: true, message: "Iltimos banner havola (slug)", trigger: "change" }],

  "top_banner.0.image.uz": [{ required: true, message: "Iltimos banner yuklang", trigger: "change" }],
  "top_banner.0.image.ru": [{ required: true, message: "Iltimos banner yuklang", trigger: "change" }],
  "top_banner.0.slug": [{ required: true, message: "Iltimos banner havola (slug)", trigger: "change" }],


})




const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      await categoryStore.addCategory(category);
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