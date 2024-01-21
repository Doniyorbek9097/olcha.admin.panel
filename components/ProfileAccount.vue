<template>
   <q-drawer :model-value="modelValue" side="right" elevated overlay>
      <q-toolbar>
        <q-icon size="25px" name="assignment_ind" />
        <q-toolbar-title>
          Mening Profilim
        </q-toolbar-title>
        <q-btn icon="close" fab-mini flat @click="emits('update:modelValue', !modelValue)" />
      </q-toolbar>
    
      <q-form @submit.prevent="(userStore.updateUser(`/user/${userStore.user._id}`, userStore.user), emits('update:modelValue', !modelValue))">
      <div class="row q-pa-md flex flex-col gap-2">
        <div class="col-12 justify-center flex">
           <q-avatar size="150px">
              <q-img
              src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/hipster_beard_male_man-512.png"
              spinner-color="primary"
              spinner-size="82px"
              width="100%"
            />
           </q-avatar>
        </div>

        <div class="col-12 justify-center">
            <q-item-label class="q-pa-xs">Ismingiz*</q-item-label>
            <q-input v-model="userStore.user.firstname" label="Ismingiz" dense outlined class="q-pa-xs" />
        </div>

        <div class="col-12 justify-center">
            <q-item-label class="q-pa-xs">Familyangiz*</q-item-label>
            <q-input v-model="userStore.user.lastname"  label="Familyangiz" dense outlined class="q-pa-xs" />
        </div>

        <div class="col-12">
            <q-btn type="submit" color="primary" icon="save" label="Profile Yangilash" />
        </div>

        <div class="col-12">
            <q-btn type="button" color="red" icon="exit_to_app" label="Accountdan Chiqish" @click="userStore.checkOut()"/>
        </div>

      </div>
      </q-form>
      
    </q-drawer>
</template>

<script setup>
import { useUserStore } from '../stores/user.store';

const userStore = useUserStore();

let user;
if(localStorage.user) user = JSON.parse(localStorage.user);

userStore.getUser(`/user/${user?._id}`);
const emits = defineEmits(['update:modelValue']);
const props = defineProps(['modelValue']);

</script>

<style lang="scss" scoped>

</style>