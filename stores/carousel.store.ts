import { defineStore } from "pinia"
import type { ICarousel } from "~/types";
export const useCarouselStore = defineStore("carouselStore", () => {
    const carouseles = ref<[]>([]);
    const message = ref("");

    const addCarousel = async (carousel: ICarousel) => {
        const { data, status } = await useAPIFetch("/carousel", { method: "post", body: carousel });
        console.log(status.value)
        status.value == "success" && (message.value = "Muofaqqiyatli saqlandi");
        status.value == "error" && (message.value = "Serverda Xatolik");
        process.client && alert(message.value);

    }

    const getCarousel = async () => {
        const { data } = await useAPIFetch("/carousel");
        carouseles.value = data.value;

    }

    
    return {
        carouseles,
        addCarousel,
        getCarousel
    }

})