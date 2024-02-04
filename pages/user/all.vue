<template>
    <q-page class="q-pa-sm">
       <q-card flat>
         <q-table :grid="grid"  :filter="filter" flat bordered title="Category" :rows="userStore.users"
           :columns="columns" virtual-scroll v-model:pagination="pagination">
           <template #top>
             <q-toolbar style="padding:0 !important;">
               <q-btn flat round dense icon="user" />
               <q-toolbar-title>
                 Users
               </q-toolbar-title>
               <q-space />
               <GirdList v-model="grid"/>
               <q-btn flat round dense icon="add" class="q-mr-xs" :to="localePath('/user/add')" />
   
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
                 <q-img v-if="props.row.avatar" :src="props.row.avatar"/>
   
                 <q-card-section>
                    <div class="text-subtitle1">
                    {{ props.row.role }}
                   </div>

                   <div class="text-subtitle1">
                    {{ textSlice(props.row.firstname, 0, 20) }}
                   </div>

                   <div class="text-subtitle1 underline">
                    <a :href="'tel:'+props.row.phone_number">{{ props.row.phone_number }}</a>
                   </div>
                   
                 </q-card-section>
   
                 <q-card-actions align="right">
                   <q-btn icon="edit" size="sm" flat dense color="blue" :to="`/user/${props.row._id}`"/>
                 <q-btn size="sm" flat icon="delete" color="red"
                   @click="Deleted(props.row._id, userStore.users.indexOf(props.row))" />
               </q-card-actions>
   
               </q-card>
   
             </div>
           </template>
   
   
           <template #body-cell-avatar="props">
             <q-td :props="props">
               <q-img v-if="props.row.avatar" :src="props.row.avatar" width="50px"/>
             </q-td>
           </template>
   
           <template #body-cell-fisrtname="props">
             <q-td :props="props">
               {{ props.row?.fisrtname ?? "nomalum"  }}
             </q-td>
           </template>

           
           <template #body-cell-phone_number="props">
             <q-td :props="props">
               {{ props.row.phone_number }}
             </q-td>
           </template>

           
           <template #body-cell-role="props">
             <q-td :props="props">
               {{ props.row.role }}
             </q-td>
           </template>
   
           <template #body-cell-action="props">
             <q-td :props="props">
               <q-btn icon="edit" size="sm" flat dense color="blue" :to="`/user/${props.row._id}`"/>
               <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
                 @click="Deleted(props.row._id, userStore.users.indexOf(props.row))" />
             </q-td>
           </template>
         </q-table>
       </q-card>
   
     </q-page>
   </template>
   
   <script setup>

   definePageMeta({
       layout:'default'
   
   });
   
   const { get } = useLocalStorage();
   const localePath = useLocalePath();   
   const grid = ref(false);
   const filter = ref("");
   const pagination = ref({ rowsPerPage: 100 })
   
   const userStore = useUserStore();
   await userStore.GetUsers()


   
   onMounted(() => grid.value = get("isGrid"))
   
   
   const columns = ref([
   {
     name: 'avatar',
     field: "avatar",
     label: 'Image',
     align: 'left',
     required: true
   },
   
   {
     name: 'fisrtname',
     label: 'Name',
     align: 'left',
     field: row => row.fisrtname,
     format: val => `${val}`,
     sortable: true,
     required: true
   },

   
   {
     name: 'phone_number',
     label: 'Phone Number',
     align: 'left',
     field: row => row.phone_number,
     format: val => `${val}`,
     sortable: true,
     required: true
   },

   {
     name: 'role',
     label: 'Role',
     align: 'left',
     field: row => row.role,
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
   
   
   const Deleted = async (id, index) => {
        userStore.DeleteUser(id, index);
   
       }
   
   
   </script>
   
   <style scoped>
   
   </style>