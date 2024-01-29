import { defineStore } from "pinia";

export const useBrendStore = defineStore("brendStore", () => {
    const brends = ref([]);
    const brend = ref({});


    return {
        brends,
        brend
    }

})