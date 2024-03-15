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
        orginal_price: null,
        sale_price: null,
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
        const data = await useAPIFetch("/product", {
            method: "post",
            body: result
        });

        return data;

    }



    const getProducts = async () => {
        await Reset();
        const data = await useAPIFetch("/products");
        products.value = data as IProduct[];
        return data;
    }

    const getOneProduct = async (slug: string) => {
        const data = await useAPIFetch("/product-slug/" + slug);
        product.value = data as IProduct;
        return data;
    }



    const getById = async (id: string) => {
        const data = await useAPIFetch("/product/" + id);
        product.value = data as IProduct;
        return data;
    }



    const updateProduct = async (id: string, product: IProduct) => {
        const data = await useAPIFetch("/product/" + id, {
            method: "put",
            body: product
        });

        return data;
    }


    const deleteProduct = async (id: string, index: number) => {
        const data = await useAPIFetch(`/product/${id}`, { method: "delete" })
        return data;
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
            orginal_price: null,
            sale_price: null,
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
