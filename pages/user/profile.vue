<script setup lang="ts">
import { storeToRefs } from 'pinia';
definePageMeta({
    layout:'default'   
});
   

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const SavedFormData = async () => {
    alert("Saqlandi")
   await userStore.EditProfile(user.value)
}


</script>

<template>
    <div>
        <q-card bordered flat class="p-5">
            <p class="text-lg text-bold">Malumotlarim</p>
            <q-form class="row py-2" @submit="SavedFormData">
                <div class="col-6 p-2">
                    <p>Ismingiz</p>
                    <q-input type="text" v-model="user.firstname" placeholder="Ismingiz" outlined dense required></q-input>
                </div>
                <div class="col-6 p-2">
                    <p>Familyangiz</p>
                    <q-input type="text" v-model="user.lastname" placeholder="Familyangiz" outlined dense required></q-input>
                </div>
                <div class="col-6 p-2">
                    <p>Telefon raqamingiz</p>
                    <q-input type="tel" v-model="user.phone_number" required outlined dense prefix="+998"
                            mask="## ### ## ##" placeholder="00 000 00 00" />
                </div>
                <div class="col-6 p-2">
                    <p>Elektron pochtangiz</p>
                    <q-input type="email" v-model="user.email" placeholder="Elektron pochta" outlined dense required></q-input>
                </div>
                <div class="col-12 p-2">
                    <p>Tug'ilgan sanangiz</p>
                    <q-input type="date" v-model="user.birthday" placeholder="Tug'ilgan sanangiz" outlined dense required></q-input>
                </div>
                <div class="col-6 p-2">
                    <p>Jinsingiz</p>
                    <q-radio type="radio" v-model="user.gender" name="jins" val="Erkak" label="Erkak" required/>
                    <q-radio type="radio" v-model="user.gender" name="jins" val="Ayol" label="Ayol" required/>
                </div>

                <div class="col-12 p-2 row justify-end">
                    <q-btn type="submit" class="bg-[gold]">Saqlash</q-btn>
                </div>
            </q-form>

        </q-card>
    </div>
</template>