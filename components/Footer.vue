<template>
    <q-footer show-if-above bordered :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
      <q-toolbar>
        <q-card-section class="col-12 text-center q-pa-xs">
          <q-btn icon="fab fa-github" flat dense></q-btn>
          <q-btn icon="fab fa-facebook" flat dense></q-btn>
          <q-btn icon="fab fa-twitter" flat dense></q-btn>
          <q-btn icon="fab fa-instagram" flat dense></q-btn>
          <br />
          <div class="text-body1">
            © 2023 by created Doniyorbek Ergashev
          </div>
        </q-card-section>
      </q-toolbar>
    </q-footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>