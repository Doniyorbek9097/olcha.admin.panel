<template>
  <q-page class="p-5">
    <ElForm ref="ruleFormRef" :model="category" :rules="rules" label-width="120px" label-position="top"
      class="demo-ruleForm" size="large" status-icon>

      <ElFormItem prop="name.uz">
        <ElInput v-model="category.name.uz" placeholder="* Category o'zbek tilida" />
      </ElFormItem>

      <ElFormItem prop="name.ru">
        <ElInput v-model="category.name.ru" placeholder="* Category rus tilida" />
      </ElFormItem>

      <p class=" text-xl">Categoryga rasm qo'shish</p>
      <ElFormItem prop="image">
        <Uploader @result="Image" :limit="1" list-type="picture" :width="128" :height="128">
          <ElButton>
            <q-icon name="add" size="20px" />
            Category rasm yuklash
          </ElButton>
        </Uploader>
      </ElFormItem>

      <p class=" text-xl">Yon tomonga banner qo'shish</p>
      <!-- left banner add  -->
      <ElFormItem required>
        <ElRow class="w-full" v-for="banner, i in category.left_banner">
          <ElCol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ElFormItem prop="left_banner.0.image.uz">
              <Uploader @result="(files) => LeftImageUz(files, i)" :limit="1" list-type="picture" :width="822">
                <ElButton>
                  <QIcon name="upload" size="20px"></QIcon>
                  O'zbek tilidagi bannerni yuklash
                </ElButton>
              </Uploader>
            </ElFormItem>
          </ElCol>

          <ElCol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ElFormItem prop="left_banner.0.image.ru">
              <Uploader @result="(files) => LeftImageRu(files, i)" :limit="1" list-type="picture" :width="822">
                <ElButton>
                  <QIcon name="upload" size="20px"></QIcon>
                  Ruscha tilidagi bannerni yuklash
                </ElButton>
              </Uploader>
            </ElFormItem>
          </ElCol>


          <ElCol :span="24">
            <ElFormItem prop="left_banner.0.slug">
              <el-select v-model="banner.slug" size="large" filterable allow-create default-first-option
                :reserve-keyword="false" placeholder="Bannerga havola yo'lini ko'rsating">
                <el-option v-for="item in subCategories.concat(childCategories)" :key="item._id" :label="item.slug"
                  :value="item.slug" />
              </el-select>
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElButton v-if="!category.left_banner?.length" @click="addToLeftBanner">
          <q-icon name="add" size="20px" />
          Yonga banner qo'shish
        </ElButton>
      </ElFormItem>

      <p class=" text-xl">Yuqorida turuvchi bannerlar qo'shish</p>
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
              <Uploader @result="(files) => TopImageRu(files, i)" :limit="1" list-type="picture">
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
                <el-option v-for="item in subCategories.concat(childCategories)" :key="item._id" :label="item.slug"
                  :value="item.slug" />
              </el-select>
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElCol :span="24">
          <ElButton v-if="category.top_banner!.length < 3" @click="addToTopBanner">
            <q-icon name="add" size="20px" />
            Yuqoriga bannerlar qo'shish
          </ElButton>
        </ElCol>
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
import type { FormInstance } from 'element-plus'

definePageMeta({
  layout: "default"
});


const id = useRoute().params.id as string;

const categoryStore = useCategoryStore();
await categoryStore.getCategory();
await categoryStore.getOneCategory(id);
const { category, subCategories, childCategories } = categoryStore;


const ruleFormRef = ref<FormInstance>();

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




const Image = async (file: any) => {
  category.image = await fileReander(file.raw).catch(err => console.log(err)) as string;
}



const LeftImageUz = async (file: any, index: number) => {
  category.left_banner![index].image.uz = await fileReander(file.raw).catch((err: string) => console.log(err)) as string;

}

const LeftImageRu = async (file: any, index: number) => {
  category.left_banner![index].image.ru = await fileReander(file.raw).catch((err: string) => console.log(err)) as string;
}


const TopImageUz = async (file: any, index: number) => {
  category.top_banner![index].image.uz = await fileReander(file.raw).catch((err: string) => console.log(err)) as string;

}


const TopImageRu = async (file: any, index: number) => {
  category.top_banner![index].image.ru = await fileReander(file.raw).catch(err => console.log(err)) as string;

}





const addToLeftBanner = () => {
  category.left_banner!.push({
    image: {
      uz: "",
      ru: ""
    },
    slug: ""
  });
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
      await categoryStore.updateCategory(id, category);
    } else {
      console.log('error submit!', fields)
    }
  })
}


</script>

<style scoped></style>