<template>
    <q-page class="flex justify-center items-center p-5">
      <q-card class=" w-full max-w-[400px] p-5">
        <el-form ref="ruleFormRef" :model="user" :rules="rules" label-width="120px" label-position="top"
          class="demo-ruleForm" :size="'large'" status-icon>
  
            <p class="text-center text-2xl pb-5">Code Kiritish</p>
  
          <el-form-item prop="phone_number">
            <el-input type="number" v-model="user.phone_number" placeholder="Telefon raqamingiz" />
          </el-form-item>
  
          <el-form-item>
            <el-button class="w-full" type="primary" color="blue" @click="submitForm(ruleFormRef)">
              Ro'yxatdan o'tish
            </el-button>
          </el-form-item>
  
          <ElFormItem>
            <ElButton class="w-full" :link="true" @click="navigateTo(localePath('/login'))">Kirish</ElButton>
          </ElFormItem>
  
        </el-form>
      </q-card>
    </q-page>
  </template>
  
  <script lang="ts" setup>
  import type { FormInstance, FormRules } from 'element-plus'
  definePageMeta({
    layout: "register"
  })
  
  const localePath = useLocalePath();
  const userStore = useUserStore();
  
  const user = reactive({});
  
  const ruleFormRef = ref<FormInstance>()
  
  const rules = reactive<FormRules<RuleForm>>({
    firstname: [
      { required: true, message: 'Iltimos ismingizni kiriting', trigger: 'blur' },
      { min: 3, max: 20, message: 'Belgi usunligi min-3 max-20', trigger: 'blur' },
    ],
  
    phone_number: [
      { required: true, message: 'Iltimos telefon raqamingiz kiriting', trigger: 'blur' },
      { min: 7, max: 7, message: 'sonlar usunligi 7 ta bo\'lish kerak', trigger: 'blur' },
    ],
  
    email: [
      { required: true, message: 'Iltimos telefon raqamingiz kiriting', trigger: 'blur' }
    ],
  
    password: [
      { required: true, message: 'Iltimos Parol kiriting', trigger: 'blur' },
      { min: 10, max: 20, message: 'Belgi usunligi min-10 max-20', trigger: 'blur' },
    ]
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('ddd');
  
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