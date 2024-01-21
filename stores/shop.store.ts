import { defineStore } from "pinia";
import { IShop } from "~/types"
export const useShopStore = defineStore("shopStore", () => {
    const shops = ref([]);
    const shop = reactive<IShop>({});

    const getShops = async () => {
        try {
            const {data, status} = await useAPIFetch("/shops");
            shops.value = data;
        } catch (error) {
            console.log(error);
            
        }
    }


    return {
        shops,
        shop,
        getShops
        
    }

})