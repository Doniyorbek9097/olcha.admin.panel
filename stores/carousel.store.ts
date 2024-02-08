import { defineStore } from "pinia"
import type { ICarousel } from "~/types";
import { useRouter } from "#vue-router";
import { useQuasar } from "quasar";

export const useCarouselStore = defineStore("carouselStore", () => {
    const router = useRouter();
    const $q = useQuasar();
    const carouseles = ref<[]>([]);
    const carousel = ref<ICarousel>({
        image: {
            uz: "",
            ru: ""
        },
        slug: ""
    });

    const addCarousel = async (carousel: ICarousel) => {
        const { data, status } = await useAPIFetch("/carousel", { method: "post", body: carousel });

        if(status.value == "success") {
            $q.notify({
                message: "Muofaqqiyatli saqlandi",
                color: "green",
                position: "top-right"
            }),

            router.back()
        }


        if(status.value == "error")  {
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: "top-right"
            })
        }

    }


    const getCarousel = async () => {
        await Reset()
        const { data, status } = await useAPIFetch("/carousel");
       
        if(status.value == "success")  {
            carouseles.value = data.value
        }
        
        if(status.value == "error") {
            $q.notify({
                message: "Serverda Xatolik",
                color: "red",
                position: "top-right"
            })
        }

    }


    const deleteCarousel = (id: string, index: number) => {
        $q.dialog({
            dark: true,
            title: "Carousel o'chirish",
            message: "Rostan ham o'chirmoqchimisiz?",
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const { data, status } = await useAPIFetch(`/carousel/${id}`, { method: "delete" });

            if(status.value == "success")  {
                carouseles.value.splice(index, 1)
                $q.notify({
                    message: "Muoffaqqiyatli o'chirildi",
                    color: "green",
                    position: 'top-right'
                })
            }

            if(status.value == "error") {
                $q.notify({
                    message: "Serverda Xatolik",
                    color: "red",
                    position: 'top-right'
                })
            }

        })

    }

    const Reset = async () => {
        carousel.value = {
            image: {
                uz: "",
                ru: ""
            },
            slug: ""
        };
    }


    return {
        carouseles,
        carousel,
        addCarousel,
        getCarousel,
        deleteCarousel,
        Reset
    }

})