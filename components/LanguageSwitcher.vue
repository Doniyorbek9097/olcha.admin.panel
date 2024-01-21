<template>
  <q-item clickable>
    <q-btn-dropdown fab-mini dense flat :label="locale">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Til Tanlang</div>
          <q-radio v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" v-model="newLocale"
            @click="switchLanguage" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="sLocale"
            :label="sLocale"/>

        </div>
      </div>
    </q-btn-dropdown>
  </q-item>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from 'vue-i18n'
import { useRouter } from "vue-router"
import Tr from "src/i18n/translation"
const { t, locale } = useI18n()
const supportedLocales = Tr.supportedLocales
const router = useRouter()
const newLocale = ref(locale);

const switchLanguage = async () => {
  await Tr.switchLanguage(newLocale.value)

  try {
    await router.replace({ params: { locale: newLocale.value } })
  } catch (e) {
    console.log(e)
    router.push("/")
  }
}


</script>

<style lang="scss" scoped></style>
