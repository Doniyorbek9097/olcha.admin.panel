import { defineStore } from "pinia";
import type { IBrend } from "~/types";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export const useBrendStore = defineStore("brendStore", () => {
    const $q = useQuasar();
    const router = useRouter();
    const brends = ref<IBrend[]>([]);
    const brend = ref<IBrend>({
        name: "",
        title: {
            uz: "",
            ru: ""
        },
        discription: {
            uz: "",
            ru: ""
        },

        image: {
            uz: "",
            ru: ""
        },
        logo: ""
    });

    
    const Reset = async () => {
        brend.value = {
            name: "",
            title: {
                uz: "",
                ru: ""
            },
            discription: {
                uz: "",
                ru: ""
            },
    
            image: {
                uz: "",
                ru: ""
            },
            logo: ""
        }
    
    }

    const addBrend = async (brend:IBrend) => {
        $q.loading.show();
        const { data, status } = await useAPIFetch("/brend", {
            method:"post",
            body: brend
        });

        if(status.value == "success") {
            $q.loading.hide();
            $q.notify({
                message: "Muoffaqqiyatli Saqlandi",
                color: "green",
                position:"top-right"
            }),

            router.back()
        }

        if(status.value == "error") {
            $q.loading.hide();
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position:"top-right"
            })
        }

    }


    const getBrends = async () => {
        $q.loading.show();
        const { data, status } = await useAPIFetch("/brends");
        
        status.value == "success" && (
            await Reset(),
            $q.loading.hide(),
            brends.value = data.value as IBrend[]
        );

        status.value == "error" && (
            $q.loading.hide(),
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position:"top-right"
            })
        );

    }


    const deleteBrend = async(id: string, index: number) => {
        $q.dialog({
            dark: true,
            title: "Carousel o'chirish",
            message: "Rostan ham o'chirmoqchimisiz?",
            cancel: true,
            persistent: true
        }).onOk(async () => {
            $q.loading.show({ delay: 400 });
            const { data, status } = await useAPIFetch(`/brend/${id}`, { method: "delete" });

            status.value == "success" && (
                brends.value.splice(index, 1),
                $q.notify({
                    message: "Muoffaqqiyatli o'chirildi",
                    color: "green",
                    position: 'top-right'
                }),
                $q.loading.hide()
            );

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
        brends,
        brend,
        addBrend,
        getBrends,
        deleteBrend,
        Reset
    }
})