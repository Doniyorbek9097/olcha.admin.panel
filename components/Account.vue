
<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['update:modalValue']);

const updateModelValue = computed({
  get:() => props.modalValue,
  set:(newVal) => emits("update:modelValue", newVal)
})

const userStore = useUserStore();
const localePath = useLocalePath();



</script>

<template>
    <q-drawer :model-value="modelValue" side="right" elevated overlay>
      <q-toolbar>
        <q-icon size="25px" name="assignment_ind" />
        <q-toolbar-title>
          Mening Profilim
        </q-toolbar-title>
        <q-btn icon="close" fab-mini flat @click="updateModelValue = false" />
      </q-toolbar>
    
      <q-form>
      <div class="row q-pa-md flex flex-col gap-2 items-center text-center">
        <div class="col-12 flex justify-center ">
           <q-avatar size="150px">
              <q-img
              :src="userStore.user?.avatar || 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/hipster_beard_male_man-512.png'"
              spinner-color="primary"
              spinner-size="82px"
              width="70%"
            >
          </q-img>
           </q-avatar>
        </div>
            <p class="text-lg text-bold">{{ userStore.user?.username }}</p>
            <p class="text-lg text-bold">{{ userStore.user?.lastname }}</p>
            <p class="text-lg text-bold">{{ userStore.user?.email }}</p>
            <p class="text-lg text-bold">{{ userStore.user?.birthday }}</p>



        <div class="flex flex-col gap-3">
          <q-btn :to="localePath('/user/profile')" color="blue">Profileni yangilash</q-btn>
            <q-btn @click="userStore.Logout" color="red" icon="exit_to_app" label="Accountdan Chiqish"/>
        </div>

      </div>
      </q-form>
      
    </q-drawer>
</template>

<style lang="scss" scoped>

</style>