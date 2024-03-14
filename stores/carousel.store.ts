import { defineStore } from "pinia"
import type { ICarousel } from "~/types";
import { useRouter } from "#vue-router";
import { useQuasar } from "quasar";

export const useCarouselStore = defineStore("carouselStore", () => {
    const router = useRouter();
    const $q = useQuasar();
    const carouseles = ref<ICarousel[]>([]);
    const carousel = ref<ICarousel>({
        image: {
            uz: "",
            ru: ""
        },
        slug: ""
    });

    const addCarousel = async (carousel: ICarousel) => {
        const  data = await useAPIFetch("/carousel", { method: "post", body: carousel });
        carouseles.value = data as ICarousel[]
        return data;
    }


    const getCarousel = async () => {
        await Reset()
        const data = await useAPIFetch("/carousel");
        carousel.value = data as ICarousel;
        return data;
    }


    const deleteCarousel = async (id: string, index: number) => {
        const data = await useAPIFetch(`/carousel/${id}`, { method: "delete" });
        return data;
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