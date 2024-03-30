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

    const addBrend = async (brend: IBrend) => {
        const data = await useAPIFetch("/brend", {
            method: "post",
            body: brend
        });

        return data;

    }


    const getBrends = async () => {
        const data = await useAPIFetch("/brends");
        brends.value = data as IBrend[];
        return data;
    }


    const getBrend = async (id: string) => {
        const data = await useAPIFetch(`/brend/${id}`);
        brend.value = data as IBrend;
        return data;
    }


    const updateBrend = async (id: string, brend: IBrend) => {
        const data = await useAPIFetch(`/brend/${id}`, {
            method: "put",
            body: brend
        });

        return data;
    }



    const deleteBrend = async (id: string, index: number) => {
        const data = await useAPIFetch(`/brend/${id}`, { method: "delete" });
        return data;
    }

    return {
        brends,
        brend,
        addBrend,
        getBrends,
        getBrend,
        updateBrend,
        deleteBrend,
        Reset
    }
})