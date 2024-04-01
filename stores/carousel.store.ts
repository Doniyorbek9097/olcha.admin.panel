import { defineStore } from "pinia"
import type { ICarousel } from "~/types";
import { useRouter } from "#vue-router";
import { useQuasar } from "quasar";

export const useCarouselStore = defineStore("carouselStore", () => {
    const router = useRouter();
    const $q = useQuasar();
    const carouseles = ref<ICarousel[]>([]);
    const loading = ref(false);
    const carousel = ref<ICarousel>({
        image: {
            uz: "",
            ru: ""
        },
        slug: ""
    });

    const addCarousel = async (carousel: ICarousel) => {
        loading.value = true;
        const  data = await useAPIFetch("/carousel", { method: "post", body: carousel });
        carousel.value = data as ICarousel;
        loading.value = false;
        return data;
    }


    const getCarousel = async () => {
        await Reset()
        const data = await useAPIFetch("/carousel");
        carouseles.value = data as ICarousel[];
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
        loading,
        addCarousel,
        getCarousel,
        deleteCarousel,
        Reset
    }

})