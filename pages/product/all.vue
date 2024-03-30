<template>
    <q-page class="q-pa-sm">
        <q-card flat>
            <q-table :grid="grid" :filter="filter" flat bordered title="Products" :rows="productStore.products"
                :columns="columns" :virtual-scroll="pending" v-model:pagination="pagination">
                <template #top>
                    <q-toolbar style="padding:0 !important;">
                        <q-btn flat round dense icon="category" />
                        <q-toolbar-title>
                            Products
                        </q-toolbar-title>
                        <q-space />
                        <GirdList v-model="grid" />
                        <q-btn flat round dense icon="add" class="q-mr-xs"
                            @click="navigateTo(localePath('/product/add'))" />

                    </q-toolbar>
                    <q-toolbar>
                        <q-space />
                        <q-input v-model="filter" dense outlined placeholder="Slug nomi bo'yicha qidirish"
                            :class="$q.screen.lt.sm ? 'full-width' : 'w-50'">
                            <template #append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                        <q-space />
                    </q-toolbar>
                </template>


                <template #body-cell-image="props">
                    <q-td :props="props">
                        <q-img :src="props.row.images[0]" draggable width="50px"></q-img>
                    </q-td>
                </template>



                <template #body-cell-action="props">
                    <q-td :props="props">
                        <q-btn icon="edit" size="sm" flat dense color="blue"
                            @click="navigateTo(localePath(`/product/${props.row._id}`))" />

                        <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense color="red"
                            @click="deleteProduct(props.row, productStore.products.indexOf(props.row))" />

                    </q-td>
                </template>

                <template v-if="grid" #item="props">
                    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-xs">
                        <q-card bordered :class="$q.dark.isActive ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
                            <q-img :src="props.row.images[0]" style="max-height: 200px;">
                                <q-badge v-if="props.row?.discount" color="red" rounded floating
                                    :label="props.row?.discount + '% Chegirma'" />
                            </q-img>
                            <q-card-section>
                                <div class="text-subtitle1">
                                    {{ textSlice(props.row.name, 0, 50) }}
                                </div>

                            </q-card-section>

                            <q-card-section>
                                <p class="text-bold">
                                    Narxi: {{ $n(props.row.sale_price) }} {{ $t('sum') }}
                                </p>
                                <p class="line-through text-[12px]" v-if="props.row.discount">
                                    Narxi: {{ $n(props.row.orginal_price) }} {{ $t('sum') }}
                                </p>
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn type="primary" icon="edit"
                                    @click="navigateTo(localePath(`/product/${props.row._id}`))" />
                                <q-btn type="primary" icon="delete"
                                    @click="deleteProduct(props.row, productStore.products.indexOf(props.row))" />
                            </q-card-actions>

                        </q-card>

                    </div>
                </template>

            </q-table>
        </q-card> <!-- GRID TEMPLATE -->


    </q-page>
</template>
  
<script lang="ts" setup>
definePageMeta({
    layout: "default"
})
const { get } = useLocalStorage()
const $q = useQuasar();
const localePath = useLocalePath();
const { t } = useI18n()
const productStore = useProductStore();
const filter = ref("");
const pagination = ref({ rowsPerPage: 100 })
const grid = ref(false);
onMounted(async() => grid.value = get("isGrid")) 


const { data, pending, error } = await useLazyAsyncData("products", async () =>  {
    return await productStore.getProducts();
})


const columns = [

    {
        name: 'image',
        field: "image",
        label: 'Image',
        align: 'left',
        required: true
    },

    {
        name: 'name',
        label: 'Nomi',
        align: 'left',
        field: row => textSlice(row.name, 0, 50),
        format: val => `${val}`,
        sortable: true,
        required: true
    },

    {
        name: 'price',
        label: 'Narxi',
        align: 'left',
        field: row => row.sale_price+ t("sum"),
        format: val => `${val}`,
        sortable: true,
        required: true
    },

    {
        name: 'discount',
        label: 'Chegirma',
        align: 'left',
        field: row => row.discount+"%",
        format: val => `${val}`,
        sortable: true,
        required: true
    },

    {
        name: 'countInStock',
        label: 'Miqdori',
        align: 'left',
        field: row => row.countInStock,
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

];



const deleteProduct = async (product, index) => {
  $q.dialog({
        title: `${product.name}ni o'chirish`,
        message: 'Rostan ham ochirilsinmi ?',
        ok: {
          push: true,
          color: "green",
        },
        cancel: {
          push: true,
          color:"red"
        },
        persistent: true
      }).onOk(async() => {
        productStore.products.splice(index, 1);
        await productStore.deleteProduct(product._id, index);
      })
}
 





</script>
  
<style lang="scss" scoped></style>
  