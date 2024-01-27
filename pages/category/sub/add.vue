<template>
  <q-page class="p-5">
    <ElForm ref="ruleFormRef" :model="category" :rules="rules" label-width="120px" label-position="top"
      class="demo-ruleForm" size="large" status-icon>
      <ElFormItem prop="parentId">
        <ElCol :span="24">
            <el-select v-model="category.parentId" filterable allow-create default-first-option :reserve-keyword="false"
              placeholder="* Parent Category tanlang">
              <el-option v-for="item in categories" :key="item._id" :label="item.slug" :value="(item._id as string)" />
            </el-select>
          </ElCol>
      </ElFormItem>
      
      <ElFormItem prop="name.uz">
        <ElInput v-model="category.name.uz" placeholder="* Category o'zbek tilida"/>
      </ElFormItem>

      <ElFormItem prop="name.ru">
        <ElInput v-model="category.name.ru" placeholder="* Category rus tilida"/>
      </ElFormItem>


      <ElFormItem>
        <ElButton @click="submitForm(ruleFormRef)" color="teal">
          <q-icon name="save" size="20px" />
          Saqlash
        </ElButton>
        <ElButton @click="$router.back()" color="red">
          <q-icon name="close" size="20px" />
          Bekor qilish
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
const { category, categories } = categoryStore;
await categoryStore.getCategory();

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  "parentId": [{ required: true, message: "Iltimos parent category tanlang", trigger: "change" }],
  "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],


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