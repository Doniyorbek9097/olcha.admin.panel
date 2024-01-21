<template>
    <q-header show-if-above bordered>
      <q-toolbar :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'">
        <q-btn flat dense round @click="" icon="menu" aria-label="Menu" />
        <q-toolbar-title>
          Admin dashboard
        </q-toolbar-title>
        <q-space />
        <div class="row q-gutter-xs items-center no-wrap">
          <LightNight/>
          <q-btn round dense flat icon="notifications">
            <q-badge color="red" text-color="white" floating>
              3
            </q-badge>
            <q-menu>
              <q-list style="min-width:100px;">
                <p>yangi Habarlar</p>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round dense flat :icon="$q.fullscreen?.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type:Boolean,
        default: false
    }
});

const emits = defineEmits(["modelValue"])
</script>

<style lang="scss" scoped>

</style>