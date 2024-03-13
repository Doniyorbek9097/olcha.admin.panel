<template>
  <q-page class="q-pa-sm">
     <q-card flat>
       <q-table :grid="grid" :filter="filter" flat bordered title="Category" :rows="categoryStore.categories"
        :columns="columns" :virtual-scroll="pending" v-model:pagination="pagination">
         <template #top>
           <q-toolbar style="padding:0 !important;">
             <q-btn flat round dense icon="category" />
             <q-toolbar-title>
               Categories
             </q-toolbar-title>
             <q-space />
             <GirdList v-model="grid"/>
             <q-btn flat round dense icon="add" class="q-mr-xs" :to="localePath('/category/parent/add')" />
 
           </q-toolbar>
           <q-toolbar>
             <q-space />
             <q-input v-model="filter" dense outlined placeholder="Nomi bo'yicha qidirish" :class="$q.screen.lt.sm ? 'full-width' : 'w-50'">
               <template #append>
                 <q-icon name="search" />
               </template>
             </q-input>
             <q-space />
           </q-toolbar>
         </template>
 
 
         <template v-if="grid" #item="props">
           <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
             <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700':'hover:bg-gray-100'">
               <q-img :src="props.row.image"/>
 
               <q-card-section>
                 <div class="text-subtitle1">
                  {{ textSlice(props.row.name, 0, 20) }}
                 </div>
                 
               </q-card-section>
 
               <q-card-actions align="right">
                 <q-btn icon="edit" size="sm" flat dense color="blue" :to="`/category/${props.row._id}`"/>
               <q-btn size="sm" flat icon="delete" color="red"
                 @click="deleteCategory(props.row._id, categoryStore.categories.indexOf(props.row))" />
             </q-card-actions>
 
             </q-card>
 
           </div>
         </template>
 
 
         <template #body-cell-image="props">
           <q-td :props="props">
             <q-img :src="props.row.image" width="50px"/>
           </q-td>
         </template>

         
         <template #body-cell-parent="props">
           <q-td :props="props">
            <div class="row">
                  <p>{{ props.row?.parent?.name}}</p>
            </div>
           </q-td>
         </template>

         
         <template #body-cell-name="props">
           <q-td :props="props">
              {{ props.row?.name }}
           </q-td>
         </template>
 
 
         <template #body-cell-action="props">
           <q-td :props="props">
             <q-btn icon="edit" size="sm" flat dense color="blue" :to="`/category/parent/${props.row._id}`"/>
             <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
               @click="deleteCategory(props.row._id, categoryStore.categories.indexOf(props.row))" />
           </q-td>
         </template>
       </q-table>
     </q-card>
 
   </q-page>
 </template>
 
 <script setup>
 definePageMeta({
     layout:"default"
 
 });
 
 const { get } = useLocalStorage();
 const localePath = useLocalePath();
 const categoryStore = useCategoryStore();

const { data, pending, error } = await useLazyAsyncData("parent", async () => {
  return await categoryStore.getCategory();
})
 

 const grid = ref(false);
 const filter = ref("");
 const pagination = ref({ rowsPerPage: 100 })

 
 onMounted(async() => {
    grid.value = get("isGrid")
 }) 
 
 
 const columns = ref([
 {
   name: 'image',
   field: "image",
   label: 'Image',
   align: 'left',
   required: true
 },

 {
   name: 'parent',
   field: "parent",
   label: 'Parent Category',
   align: 'left',
   required: true
 },
 

 {
   name: 'name',
   label: 'Categories',
   align: 'left',
   field: row => row.name,
   format: val => `${val}`,
   sortable: true,
   required: true
 },

 
 { 
     name: 'action', 
     label: 'Action', 
     align: "right", 
     field: 'action' 
 },
 
 ]);
 
 
 const deleteCategory = async (id, index) => {
  categoryStore.deleteCategory(id, index)
 }
 
 
 
 </script>
 
 <style scoped>
 
 </style>