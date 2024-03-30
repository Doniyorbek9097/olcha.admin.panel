<template>
  <q-page class="p-5">
    <QForm class="row" @submit="submitForm">
      <div class="col-12 p-2">
          <QInput v-model="brend.name" placeholder="Brend nomi" outlined dense required :rules="[rules]"/>
      </div>
      <div class="col-6 p-2">
          <QInput v-model="brend.title.uz" label="Brend Sarlavhasi o'zbek tilida" outlined dense required :rules="[rules]"/>
      </div>
      <div class="col-6 p-2">
          <QInput v-model="brend.title.ru" label="Brend Sarlavhasi rus tilida" outlined dense required :rules="[rules]"/>
      </div>

      <div class="col-12 p-2">
        <p>Brend discription o'zbek tilida</p>
        <CreatePost v-model="brend.discription.uz"/>
      </div>

      <div class="col-12 p-2">
        <p>Brend discription rus tilida</p>
        <CreatePost v-model="brend.discription.ru"/>
      </div>

      <div class="col-12 p-2">
        <p>Brend Logosi</p>
        <Uploader v-model="brend.logo"/>          
      </div>

      <div class="col-12 p-2">
        <p>Brend Image o'zbek tilida</p>
        <Uploader v-model="brend.image.uz"/>
      </div>

      <div class="col-12 p-2">
        <p>Brend Image rus tilida</p>
        <Uploader v-model="brend.image.ru"/>
      </div>
      
      <div class="col-6 p-2 row gap-2">
        <QBtn type="submit" color="teal" :loading="loading" glossy>
          <q-icon name="save"/>
          Saqlash
        </QBtn>

        <QBtn type="button" @click="$router.back()" color="red" glossy>
          <q-icon name="close" />
          Bekor qilish
        </QBtn>
      </div>

    </QForm>
  </q-page>
</template>
  
<script setup lang="ts">
definePageMeta({
  layout: "default"
});

const router = useRouter();
const brendStore = useBrendStore();
const { brend } = brendStore;

const rules = val => val && val.length > 0 || "Iltimos maydoni to'ldiring"; 


const submitForm = async () => {
    await brendStore.addBrend(brend);
    router.back();
}





</script>
  
<style scoped></style>