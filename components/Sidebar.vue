<template>
  <q-toolbar>
        <q-btn flat round dense icon="shop" />
        <q-toolbar-title>
          OLCHA admin
        </q-toolbar-title>
        <q-btn flat round dense icon="close" @click="emits('update:modelValue', !modelValue)" />
      </q-toolbar>

      <q-separator spaced inset dark />

      <q-list bordered separator padding>
        <q-item :to="localePath('/')" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item expand-separator icon="category" label="Categories">
          <q-list padding>
            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/category/parent/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Category</q-item-label>
              </q-item-section>
            </q-item>

            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/category/sub/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Sub Category</q-item-label>
              </q-item-section>
            </q-item>

            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/category/child/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Child Category</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="local_mall" label="Products">
          <q-list bordered>
            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/product/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Products</q-item-label>
              </q-item-section>
            </q-item>

            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/brend/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Brends</q-item-label>
              </q-item-section>
            </q-item>

            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/carousel/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Memory</q-item-label>
              </q-item-section>
            </q-item>

            <q-item :inset-level=".5" active-class="q-item-no-link-highlighting" :to="localePath('/carousel/all')">
              <q-item-section avatar><q-icon name="arrow_outward"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Carousel Banner</q-item-label>
              </q-item-section>
            </q-item>
            
          </q-list>
        </q-expansion-item>
        
      </q-list>

</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue"]);
const localePath = useLocalePath();
</script>

<style scoped>
.q-router-link--exact-active {
  background-color: rgba(180, 179, 179, 0.158);

} 
</style>