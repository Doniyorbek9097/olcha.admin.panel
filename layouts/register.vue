<template>
      <q-layout view="lHr LPR lfr">
    <q-header show-if-above bordered>
      <q-toolbar :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
        <q-toolbar-title>
          Admin dashboard
        </q-toolbar-title>
        <q-space />
        <div class="row q-gutter-xs items-center no-wrap">
          <LightNight />
          <LangSwichter />
        </div>
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <NuxtPage class="min-h-[100vh] overflow-auto" />
    </q-page-container>
    <Footer />

  </q-layout>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>