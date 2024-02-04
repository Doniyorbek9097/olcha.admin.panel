<template>
  <q-page class="flex justify-center items-center p-5">
  <q-card class="w-full max-w-[500px] p-5">
     <el-form
      ref="ruleFormRef"
      :model="user"
      :rules="rules"
      label-width="120px"
      label-position="top"
      class="demo-ruleForm"
      :size="$q.screen.lt.sm ? 'small': 'default'"
      status-icon
    >
      
<div class="flex items-center justify-between pb-5">
  <p class=" text-lg">Tizimga kirish</p>
  <ElButton  color="blue" @click="navigateTo(localePath('/register'))">Ro'yxatdan o'tish</ElButton>
</div>      

      <el-form-item label="Email" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
  
      
      <el-form-item label="Password" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" color="blue" @click="submitForm(ruleFormRef)">
          Kirish
        </el-button>
        <el-button color="red" @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
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
  
  const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
  }))
  </script>