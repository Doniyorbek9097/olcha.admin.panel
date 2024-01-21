import { defineStore } from "pinia";
import type { IProduct } from "~/types";
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

export const useProductStore = defineStore("productStore", () => {
    const $q = useQuasar();
    const router = useRouter();
    const message = ref("");
    const products = ref<IProduct[]>([]);
    const product = ref<IProduct>({})

    const addProduct = async (product: IProduct) => {
        $q.loading.show();
        const { data, status } = await useAPIFetch("/product", {
            method: "post",
            body: product
        });

        if (status.value == "success") {
            $q.loading.hide();
            $q.notify({
                message: "Muoffaqqiyatli saqlandi",
                color: "green",
                position: "top-right"
            })
            router.back();

        }

        if (status.value == "error") {
            $q.loading.hide();
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: "top-right"
            })
        }



    }



    const getProducts = async () => {
        $q.loading.show();
        const { data, status, error } = await useAPIFetch<any>("/products");

        status.value == "success" && (
        products.value = data.value,
        $q.loading.hide()   
        )

        status.value == "error" && (
            $q.loading.hide(),
            $q.notify({
                message: error.value?.message,
                color: "red",
                position: "top-right"
            })
        )
    }

    const getOneProduct = async (slug: string) => {
        $q.loading.show();
        const { data, status, error } = await useAPIFetch("/product-slug/" + slug);

        status.value == "success" && (
            product.value = data.value,
            $q.loading.hide()   
            )
    
            status.value == "error" && (
                $q.loading.hide(),
                $q.notify({
                    message: error.value?.message,
                    color: "red",
                    position: "top-right"
                })
            )
    }


    const updateProduct = async (product: object) => {
        const { data, status, error } = await useAPIFetch("/product/" + product._id, {
            method: "put",
            body: product
        });

    }


    const deleteProduct = async (id: string, index: number) => {
        $q.dialog({
            dark: true,
            title: "Mahsulot o'chirish",
            message: "Rostan ham o'chirmoqchimisiz?",
            cancel: true,
            persistent: true
          }).onOk(async () => {
            $q.loading.show({ delay: 400 });
            const { data, status } = await useAPIFetch(`/product/${id}`, { method: "delete" })
       
            if (status.value == "success") {
                products.value.splice(index, 1),
                $q.notify({
                    message: "Muoffaqqiyatli o'chirildi",
                    color:"green",
                    position:'top-right'
                });
                $q.loading.hide();
                return true
            };
            
            status.value == "error" && (
                $q.loading.hide(),
                $q.notify({
                    message: "Serverda Xatolik",
                    color:"red",
                    position:'top-right'
                })
            );

          })
        



}


    return {
        products,
        addProduct,
        getProducts,
        getOneProduct,
        deleteProduct,
        updateProduct
    }

})
