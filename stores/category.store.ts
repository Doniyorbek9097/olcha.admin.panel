import { acceptHMRUpdate, defineStore } from "pinia"
import type { ICategory } from "~/types";
import { useRouter } from "#vue-router";

export const useCategoryStore = defineStore("categoryStore", () => {
    const router = useRouter();
    const 
        categories = ref<ICategory[]>([]),
        subCategories = ref<ICategory[]>([]),
        childCategories = ref<ICategory[]>([]),
        loading = ref(false),
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
       try {
        loading.value = true;
        const data = await useAPIFetch("/category-add", { method: "post", body: category });
        return data;

       } catch (error) {
         console.log(error);
         
       } finally {
        loading.value = false;
       }
    };


    

    const getCategory = async () => {
        await Reset();
        const data =  await useAPIFetch("/category-all");
        categories.value = data?.categories as ICategory[];
        subCategories.value = categories.value.flatMap((cate: ICategory) => cate.children) as ICategory[];
        childCategories.value = subCategories.value.flatMap((cate: ICategory) => cate.children) as ICategory[];
        return data;
    }

    const getOneCategory = async (id: string) => {
        const data = await useAPIFetch(`/category-one/${id}`);
        category.value = data as ICategory;
        return data;
    }

    const updateCategory = async (id: string, category: ICategory) => {
        const data = await useAPIFetch(`/category-edit/${id}`, { method: "put", body: category });
        return data;
    }

    const deleteCategory = async (id: string, index: number) => {
        const data = await useAPIFetch(`/category-delete/${id}`, { method: "delete" });
        categories.value.splice(index, 1);
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
        loading,
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
  