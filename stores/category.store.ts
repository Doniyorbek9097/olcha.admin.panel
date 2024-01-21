import { defineStore } from "pinia"
import type { ICategory } from "~/types";
import { useRouter } from "#vue-router";
import { useQuasar } from "quasar";

export const useCategoryStore = defineStore("categoryStore", () => {
    const router = useRouter();
    const $q = useQuasar(),
        isActive = ref(false),
        isLoading = ref(false),
        categories = ref<ICategory[]>([]),
        category = ref<ICategory>();

    const addCategory = async (category: ICategory) => {
        $q.loading.show({ delay: 400 });
        const { data, status } = await useAPIFetch("/category", { method: "post", body: category });
       
            status.value == "success" && (
                isLoading.value = false,
                $q.notify({
                    message: "Muoffaqqiyatli yuklandi",
                    color:"green",
                    position:'top-right'
                }),
                $q.loading.hide(),
                router.back()
            );

            status.value == "error" && (
                isLoading.value = false,
                $q.loading.hide(),
                $q.notify({
                    message: "Serverda Xatolik",
                    color:"red",
                    position:'top-right'
                })
                
            );


    };


    const getCategory = async () => {
        $q.loading.show({ delay: 400 });

        const { data, status } = await useAPIFetch("/category");
       
            status.value == "success" && (
                categories.value = data.value,
                $q.loading.hide()
            );
            

            status.value == "error" && (
                $q.loading.hide(),
                $q.notify({
                    message: "Serverda Xatolik",
                    color:"red",
                    position:'top-right'
                })

            )



    }

    const getOneCategory = async (slug: string) => {
        $q.loading.show({ delay: 400 });

        const { data, status } = await useAPIFetch(`/category/${slug}`);
              
            status.value == "success" && (
                category.value = data.value,
                $q.loading.hide()    
            );

            status.value == "error" && (
                $q.loading.hide(),
                $q.notify({
                    message: "Serverda Xatolik",
                    color:"red",
                    position:'top-right'
                })
            )
    
    }

    const updateCategory = async (id: string) => {
        const { data, status } = await useAPIFetch(`/category/${id}`, { method: "put" });
       
        if (process.client) {
            status.value == "success" && (category.value = data.value);
            status.value == "pending" && alert("Yangilanmoqda...");
            status.value == "error" && alert("Serverda Xatolik");
        }
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
        isActive,
        isLoading,
        categories,
        category,
        addCategory,
        getCategory,
        getOneCategory,
        updateCategory,
        deleteCategory
    }

});
