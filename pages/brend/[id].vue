<template>
    <q-page class="p-5">
      <ElForm ref="ruleFormRef" :model="brend" :rules="rules" label-width="120px" label-position="top" class="demo-ruleForm"
        :size="$q.screen.md ? 'large' : 'default'" status-icon>
  
        <ElFormItem prop="title.uz">
          <ElInput v-model="brend.name" placeholder="Brend nomi" />
        </ElFormItem>
  
        <ElFormItem prop="title.uz">
          <ElInput v-model="brend.title.uz" placeholder="Brend sarlavhasi o'zbekcha" />
        </ElFormItem>
  
        <ElFormItem prop="title.ru">
          <ElInput v-model="brend.title.ru" placeholder="Brend sarlavhasi ruscha" />
        </ElFormItem>
  
        <p class="text-[20px] text-bold">Discription uz</p>
        <ElFormItem prop="discription.uz">
          <CreatePost v-model="brend.discription.uz"/>
        </ElFormItem>
  
        <p class="text-[20px] text-bold">Discription ru</p>
        <ElFormItem prop="discription.ru">
          <CreatePost v-model="brend.discription.ru"/>
        </ElFormItem>
  
        <p class="text-[20px] text-bold">Brend Logo</p>
        <ElFormItem prop="logo">
          <Uploader v-model="brend.logo">
            <ElButton class="my-2">
              <QIcon name="upload" size="20px"></QIcon>
              Brend logotipini yuklash
            </ElButton>
          </Uploader>
        </ElFormItem>
  
        <p class="text-[20px] text-bold">Brend Banner uzbekcha</p>
        <ElFormItem prop="image.uz">
          <Uploader v-model="brend.image.uz">
            <ElButton class="my-2">
              <QIcon name="upload" size="20px"></QIcon>
              Brend Banneri uzbekcha yuklash
            </ElButton>
          </Uploader>
        </ElFormItem>
  
        <p class="text-[20px] text-bold">Brend Banner ruscha</p>
        <ElFormItem prop="image.ru">
          <Uploader v-model="brend.image.ru">
            <ElButton class="my-2">
              <QIcon name="upload" size="20px"></QIcon>
              Brend Banneri ruscha yuklash
            </ElButton>
          </Uploader>
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
  definePageMeta({
    layout: "default"
  });

  const { id } = useRoute().params;

  const brendStore = useBrendStore();
    await brendStore.getBrend(id)
  
  
  const { brend } = brendStore;
  
  const ruleFormRef = ref<FormInstance>()
  
  const rules = reactive({
    "name": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
    "logo": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }]
  })
  
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!')
        await brendStore.updateBrend(id, brend);
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  
  
  
  
  
  </script>
    
  <style scoped></style>