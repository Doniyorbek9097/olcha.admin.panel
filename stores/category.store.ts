import { acceptHMRUpdate, defineStore } from "pinia"
import type { ICategory } from "~/types";
import { useRouter } from "#vue-router";
import { useQuasar } from "quasar";

export const useCategoryStore = defineStore("categoryStore", () => {
    const 
        categories = ref<ICategory[]>([]),
        subCategories = ref<ICategory[]>([]),
        childCategories = ref<ICategory[]>([]),
        category = ref<ICategory>({
            name: {
                uz: "",
                ru: "",
            },

            image: "",
            left_banner: [],
            top_banner: []

        });

    const addCategory = async (category: ICategory) => {
        const data = await useAPIFetch("/category", { method: "post", body: category });
        return data;
    };


    

    const getCategory = async () => {
        await Reset();
        const data =  await useAPIFetch("/categories");
        categories.value = data as ICategory[];
        subCategories.value = categories.value.flatMap((cate: ICategory) => cate.children) as ICategory[];
        childCategories.value = subCategories.value.flatMap((cate: ICategory) => cate.children) as ICategory[];
        return data;
    }

    const getOneCategory = async (id: string) => {
        const data = await useAPIFetch(`/category/${id}`);
        category.value = data as ICategory;
        return data;
    }

    const updateCategory = async (id: string, category: ICategory) => {
        const data = await useAPIFetch(`/category/${id}`, { method: "put", body: category });
        return data;
    }

    const deleteCategory = async (id: string, index: number) => {
        const data = await useAPIFetch(`/category/${id}`, { method: "delete" });
        return data;
    }


const Reset = async () => {
    category.value = {
        name: {
            uz: "",
            ru: "",
        },

        image: "",
        left_banner: [],
        top_banner: []
    }
}


    return {
        categories,
        subCategories,
        childCategories,
        category,
        addCategory,
        getCategory,
        getOneCategory,
        updateCategory,
        deleteCategory
    }

});


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
  