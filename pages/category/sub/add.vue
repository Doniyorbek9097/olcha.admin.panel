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

      <ElFormItem prop="image">
          <Uploader @result="Image" :limit="1" list-type="picture">
            <ElButton>
              <q-icon name="add" size="20px" />
              Category rasm yuklash
            </ElButton>
          </Uploader>
      </ElFormItem>

     
       <!-- top banner add  -->
       <ElFormItem required>
        <ElRow class="w-full" v-for="banner, i in category.top_banner">

          <ElCol :span="12">
            <ElFormItem prop="top_banner.0.image.uz">
              <Uploader @result="(files) => TopImageUz(files, i)" :limit="1" list-type="picture">
              <ElButton>
                <QIcon name="upload" size="20px"></QIcon>
                O'zbek tilidagi bannerni yuklash
              </ElButton>
            </Uploader>
            </ElFormItem>
          </ElCol>

          <ElCol :span="12"> 
            <ElFormItem prop="top_banner.0.image.ru">
              <Uploader @result="(files) => TopImageRu(files, i)" :limit="1" list-type="picture" >
              <ElButton>
                <QIcon name="upload" size="20px"></QIcon>
                Rus tilidagi bannerni yuklash
              </ElButton>
            </Uploader>
            </ElFormItem>
          </ElCol>


          <ElCol :span="24">
            <ElFormItem prop="top_banner.0.slug">
              <el-select v-model="banner.slug" filterable allow-create default-first-option :reserve-keyword="false"
              placeholder="Bannerga havola yo'lini ko'rsating">
              <el-option v-for="item in subCategories.concat(childCategories)" :key="item._id" :label="item.slug" :value="item.slug" />
            </el-select>
            </ElFormItem>
          </ElCol>

          <ElCol :span="24" class="my-2">
            <ElButton @click="category.top_banner?.splice(i, 1)" color="red">
            <q-icon name="delete" size="20px" />
              Top banner o'chirish
            </ElButton>
          </ElCol>
        </ElRow>

        <ElCol :span="24">
          <ElButton v-if="category.top_banner!.length < 3" @click="addToTopBanner">
            <q-icon name="add" size="20px" />
            Top banner qo'shish
          </ElButton>
        </ElCol>
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
const { category, categories } = categoryStore;
await categoryStore.getCategory();

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  "parentId": [{ required: true, message: "Iltimos parent category tanlang", trigger: "change" }],
  "name.uz": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "name.ru": [{ required: true, message: "Iltimos maydoni to'ldiring", trigger: "blur" }],
  "image": [{ required: true, message: "Iltimos rasmni yuklang", trigger: "change" }],
  "top_banner.0.image.uz": [{ required: true, message: "Iltimos banner yuklang", trigger: "change" }],
  "top_banner.0.image.ru": [{ required: true, message: "Iltimos banner yuklang", trigger: "change" }],
  "top_banner.0.slug": [{ required: true, message: "Iltimos banner havola (slug)", trigger: "change" }],


})




const Image = async (file: any) => {
  category.image = await fileReander(file.raw).catch(err => console.log(err)) as string;
}


const TopImageUz = async (file: any, index: number) => {
  category.top_banner![index].image.uz = await fileReander(file.raw).catch((err: string) => console.log(err)) as string;

}


const TopImageRu = async (file: any, index: number) => {
  category.top_banner![index].image.ru = await fileReander(file.raw).catch(err => console.log(err)) as string;

}


const addToTopBanner = () => {
  category.top_banner!.push({
    image: {
      uz: "",
      ru: ""
    },
    slug: ""
  });
}



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