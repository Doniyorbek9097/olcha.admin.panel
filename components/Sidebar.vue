<template>
    <q-drawer :model-value="modelValue"  :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-white text-black'"
      show-if-above bordered>
      <q-toolbar>
        <q-btn flat round dense icon="shop" />
        <q-toolbar-title>
          Clozzone.com
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
<!-- 
        <q-expansion-item expand-separator icon="person" label="Users">
          <q-list bordered>
            <q-item active-class="q-item-no-link-highlighting" to="/products">
              <q-item-section avatar><q-icon name="admin_panel_settings"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Admins</q-item-label>
              </q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting" to="/products">
              <q-item-section avatar><q-icon name="diversity_3"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Seller</q-item-label>
              </q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting" to="/products">
              <q-item-section avatar><q-icon name="group"></q-icon></q-item-section>
              <q-item-section>
                <q-item-label>Users</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item active-class="q-item-no-link-highlighting" :to="{ name: 'Shops' }">
          <q-item-section avatar><q-icon name="store"></q-icon></q-item-section>
          <q-item-section>
            <q-item-label>Do'konlar</q-item-label>
          </q-item-section>
        </q-item>



       

        <q-item active-class="q-item-no-link-highlighting" to="/products">
          <q-item-section avatar><q-icon name="local_shipping"></q-icon></q-item-section>
          <q-item-section>
            <q-item-label>Orders</q-item-label>
          </q-item-section>
        </q-item>



        <q-item active-class="q-item-no-link-highlighting" to="/products">
          <q-item-section avatar><q-icon name="credit_card"></q-icon></q-item-section>
          <q-item-section>
            <q-item-label>Transactions</q-item-label>
          </q-item-section>
        </q-item>

        <q-item active-class="q-item-no-link-highlighting" to="/products">
          <q-item-section avatar><q-icon name="settings"></q-icon></q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item> -->

      </q-list>
    </q-drawer>

</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue"]);
const localePath = useLocalePath();
</script>

<style lang="scss" scoped>

</style>