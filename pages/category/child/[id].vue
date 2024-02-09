<template>
  <q-page class="p-5">
    <ElForm ref="ruleFormRef" :model="category" :rules="rules" label-width="120px" label-position="top"
      class="demo-ruleForm" :size="$q.screen.md ? 'large': 'default'" status-icon>
      <ElFormItem prop="parentId">
        <ElCol :span="24">
            <el-select v-model="category.parentId" filterable allow-create default-first-option :reserve-keyword="false"
              placeholder="* Parent Category tanlang">
              <el-option v-for="item in subCategories" :key="item._id" :label="item.slug" :value="(item._id as string)" />
            </el-select>
          </ElCol>
      </ElFormItem>

      <ElFormItem>
        <ElCol :span="24">
            <el-select v-model="category.brendId" filterable allow-create default-first-option :reserve-keyword="false"
              placeholder="Brend mavjud bo'lsa tanlang">
              <el-option v-for="item in brends" :key="item._id" :label="item.slug" :value="(item._id as string)" />
            </el-select>
          </ElCol>
      </ElFormItem>

      <ElFormItem prop="name.uz">
        <ElInput v-model="category.name.uz" placeholder="* Category o'zbek tilida" />
      </ElFormItem>

      <ElFormItem prop="name.ru">
        <ElInput v-model="category.name.ru" placeholder="* Category rus tilida" />
      </ElFormItem>

      <p class=" text-xl">Categoryga rasm qo'shish</p>
      <ElFormItem prop="image">
        <Uploader v-model="category.image" :limit="1" list-type="picture" :width="128" :height="128">
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
              <Uploader v-model="banner.image.uz" :limit="1" list-type="picture" :width="822">
                <ElButton>
                  <QIcon name="upload" size="20px"></QIcon>
                  O'zbek tilidagi bannerni yuklash
                </ElButton>
              </Uploader>
            </ElFormItem>
          </ElCol>

          <ElCol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ElFormItem prop="left_banner.0.image.ru">
              <Uploader v-model="banner.image.ru" :limit="1" list-type="picture" :width="822">
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
                  :value="(item.slug as string)" />
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

          <ElCol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ElFormItem prop="top_banner.0.image.uz">
              <Uploader v-model="banner.image.uz" :limit="1" list-type="picture">
                <ElButton>
                  <QIcon name="upload" size="20px"></QIcon>
                  O'zbek tilidagi bannerni yuklash
                </ElButton>
              </Uploader>
            </ElFormItem>
          </ElCol>

          <ElCol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ElFormItem prop="top_banner.0.image.ru">
              <Uploader v-model="banner.image.ru" :limit="1" list-type="picture">
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
                  :value="(item.slug as string)" />
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
const brendStore = useBrendStore();

  await categoryStore.getCategory();
  await brendStore.getBrends();


const { brends } = brendStore;
const { category, subCategories } = categoryStore;


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