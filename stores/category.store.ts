import { acceptHMRUpdate, defineStore } from "pinia"
import type { ICategory } from "~/types";
import { useRouter } from "#vue-router";
import { useQuasar } from "quasar";

export const useCategoryStore = defineStore("categoryStore", () => {
    const router = useRouter();
    const $q = useQuasar(),
        isActive = ref(false),
        isLoading = ref(false),
        categories = ref<ICategory[]>([]),
        subCategories = ref<ICategory[]>([]),
        childCategories = ref<ICategory[]>([]),
        category = ref<ICategory>({
            name: {
                uz: "",
                ru: "",
            },

            image: [],
            left_banner: [],
            top_banner: []

        });

    const addCategory = async (category: ICategory) => {
        $q.loading.show();
        const { data, status } = await useAPIFetch("/category", { method: "post", body: category });

        status.value == "success" && (
            isLoading.value = false,
            $q.notify({
                message: "Muoffaqqiyatli yuklandi",
                color: "green",
                position: 'top-right'
            }),
            $q.loading.hide(),
            router.back()
        );

        status.value == "error" && (
            isLoading.value = false,
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: 'top-right'
            })

        );


    };


    const getCategory = async () => {
        $q.loading.show({ delay: 400 });

        category.value = {
            name: {
                uz: "",
                ru: "",
            },

            image: "",
            left_banner: [],
            top_banner: []
        }

        const { data, status } = await useAPIFetch("/category");

        status.value == "success" && (
            categories.value = data.value,
            subCategories.value = categories.value.flatMap(cate => cate.children),
            childCategories.value = subCategories.value.flatMap(sub => sub.children),
            $q.loading.hide()
        );

        status.value == "error" && (
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: 'top-right'
            })

        )



    }

    const getOneCategory = async (id: string) => {
        $q.loading.show({ delay: 400 });
        const { data, status } = await useAPIFetch(`/category/${id}`);
        
        status.value == "success" && (
            category.value = data.value,
            $q.loading.hide()
        );

        status.value == "error" && (
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: 'top-right'
            })
        )

    }

    const updateCategory = async (id: string, category: ICategory) => {
        const { data, status } = await useAPIFetch(`/category/${id}`, { method: "put", body: category });
        status.value == "success" && (
            $q.loading.hide(),
            $q.notify({
                message: "Muoffaqqiyatli yangilandi",
                color: "green",
                position: 'top-right'
            }),
            router.back()
        );

        status.value == "error" && (
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: 'top-right'
            })
        )
    }

    const deleteCategory = async (id: string, index: number) => {
        $q.dialog({
            dark: true,
            title: "Mahsulot o'chirish",
            message: "Rostan ham o'chirmoqchimisiz?",
            cancel: true,
            persistent: true
        }).onOk(async () => {
            $q.loading.show({ delay: 400 });
            const { data, status } = await useAPIFetch(`/category/${id}`, { method: "delete" });

            if (status.value == "success") {
                categories.value.splice(index, 1);
                subCategories.value.splice(index, 1);
                childCategories.value.splice(index, 1);

                $q.notify({
                    message: "Muoffaqqiyatli o'chirildi",
                    color: "green",
                    position: 'top-right'
                });
                $q.loading.hide();
                return true
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


    return {
        isActive,
        isLoading,
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
  