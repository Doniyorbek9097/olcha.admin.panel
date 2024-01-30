import { defineStore } from "pinia";
import type { IProduct } from "~/types";
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

export const useProductStore = defineStore("productStore", () => {
    const $q = useQuasar();
    const router = useRouter();
    const products = ref<IProduct[]>([]);
    const product = ref<IProduct>({
        name: {
            uz: "",
            ru: ""
        },
        discription: {
            uz: "",
            ru: ""
        },
        properteis: [],
        isPropery: false,
        price: null,
        countInStock: 1,
        parentCategory: "",
        subCategory: "",
        childCategory: "",
        shop: "",
        colors: [],
        images: [],
        // size: [],
        isDiscount: false,
        discount: 0,
        // country: "",

    });


    const addProduct = async (result: IProduct) => {
        $q.loading.show();
        const { data, status } = await useAPIFetch("/product", {
            method: "post",
            body: result
        });

        if (status.value == "success") {
            $q.loading.hide();
            $q.notify({
                message: "Muoffaqqiyatli saqlandi",
                color: "green",
                position: "top-right"
            });
            router.back();
            await Reset();

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
                message: "Serverda Xatolik",
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
                message: "Serverda Xatolik",
                color: "red",
                position: "top-right"
            })
        )
    }



    const getById = async (id: string) => {
        $q.loading.show();
        const { data, status, error } = await useAPIFetch("/product/" + id);

        status.value == "success" && (
            product.value = data.value,
            $q.loading.hide()
        )

        status.value == "error" && (
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: "top-right"
            })
        )
    }



    const updateProduct = async (id: string, product) => {
        $q.loading.show();
        const { data, status, error } = await useAPIFetch("/product/" + id, {
            method: "put",
            body: product
        });

        if(status.value == "success") {
            $q.loading.hide(),
            $q.notify({
                message: "Muoffaqqiyatli yangilandi",
                color: "green",
                position: "top-right"
            })
            router.back();
            await Reset()
        }


        if(status.value == "error") {
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: "top-right"
            })
            router.back();
        }

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
                        color: "green",
                        position: 'top-right'
                    });
                $q.loading.hide();
            };

            status.value == "error" && (
                $q.loading.hide(),
                $q.notify({
                    message: "Serverda Xatolik",
                    color: "red",
                    position: 'top-right'
                })
            );

        })

    }


    const Reset = async () => {
        products.value = [];
        product.value = {
            name: {
                uz: "",
                ru: ""
            },
            discription: {
                uz: "",
                ru: ""
            },
            properteis: [],
            isPropery: false,
            price: null,
            countInStock: 1,
            parentCategory: "",
            subCategory: "",
            childCategory: "",
            shop: "",
            colors: [],
            images: [],
            // size: [],
            isDiscount: false,
            discount: 0,
            // country: "",
        }
    
    }

        return {
            products,
            product,
            addProduct,
            getProducts,
            getOneProduct,
            getById,
            deleteProduct,
            updateProduct,
            Reset
        }

    })
