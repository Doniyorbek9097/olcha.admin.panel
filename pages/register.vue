<script setup>
definePageMeta({
  layout: "register"
})


const close = () => {
  isShowRegisterForm.value = false;
}


import { storeToRefs } from 'pinia'
const $q = useQuasar();
const userStore = useUserStore();
await userStore.GetUser()
const { user, users, isShowRegisterForm } = storeToRefs(userStore);
const phone_number = ref("");
const code = ref("");
const verified = ref(false);
const loading = ref(false);

const getCode = async () => {
  code.value = ""
  if (phone_number.value.length === 17) {
    try {
      loading.value = true;
      verified.value = false;
      const { data, pending, error } = await useAsyncData('getCode', async () => await userStore.Register(phone_number.value));
      loading.value = false;
      verified.value = true;
    } catch (error) {
      verified.value = false;
    }
  }
}


const Tasdiqlash = async () => {
  if (code.value.length === 4) {
    try {
      loading.value = true;
      const { data, pending, error } = await useAsyncData('setCode', async () => await userStore.VerifyCode(code.value, phone_number.value));
      loading.value = false;
      await userStore.GetUser()
    } catch (error) {
      verified.value = false;
    }
  }
}


</script>

<template>
  <q-page class="flex justify-center items-center p-5">
    <div class="min-w-[300px] max-w-[500px]" v-bind="$attrs">
      <div v-if="!verified" class="flex flex-col gap-5">

        <div class="flex flex-col gap-1">
          <div class=" text-2xl">Telefon raqamini kiriting</div>
          <div class=" text-md">Tasdiqlash kodini SMS orqali yuboramiz</div>
        </div>
        <q-form class="flex flex-col gap-2" @submit="getCode">
          <custom-phone-number v-model="phone_number" required class="text-lg"/>
          <q-btn type="submit" color="green" size="15px" :loading="loading">Kodni olish</q-btn>
        </q-form>

        <div class=" text-center text-sm px-5">
          Avtotizatsiyadan o'tish orqali siz shaxsiy ma'lumotlarni qayta ishlash siyosatiga rozilik
          bildirasiz
        </div>

      </div>


      <div v-else class="flex flex-col gap-5">
        <div class="flex flex-col gap-1">
          <div class=" text-2xl">Tasdiqlash Kodni kiriting</div>
          <div class=" text-md">Biz sizga tasdiqlash kodini SMS orqali yubordik</div>
        </div>
        <q-form class="flex flex-col gap-2">
          <q-input type="number" v-model="code" required outlined mask="####" placeholder="XXXX"
            class=" placeholder:text-center text-xl rounded-sm" />
          <q-btn color="green" size="15px" :loading="loading" @click="Tasdiqlash">Tasdiqlash</q-btn>
          <q-btn color="black" size="15px" @click="verified = false">Boshqa raqam terish</q-btn>

        </q-form>

        <div class=" text-center text-sm px-5">
          Avtotizatsiyadan o'tish orqali siz shaxsiy ma'lumotlarni qayta ishlash siyosatiga rozilik
          bildirasiz
        </div>

      </div>
  </div>
  </q-page>
</template>

<style scoped>
</style>