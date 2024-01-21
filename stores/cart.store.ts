import { defineStore } from "pinia";
import { Cookies } from "quasar";
import type { IProduct, ICart } from "~/types";
export const useCartStore = defineStore('cartStore', () => {
    const cart = ref({
        products:[],
        quantity:0
    });

    

    const getCart = async () => {
        try {
            const cart_id = useCookie("cart_id");
            
            if(!cart_id.value) return;
            const {data, status, error} = await useAPIFetch('/cart/'+cart_id.value);
            
            if(status.value == "success") {
                cart.value = data.value;
            }

            if(status.value == "error") {
                console.log(error.value);
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    

    const addProductCart = async(product:object) => {
        try {
            const cart_id = useCookie("cart_id");
            const user_id = useCookie("user_id");

            const {data, status, error} = await useAPIFetch("/add-cart", {
                method:"POST",
                body: {
                    user: user_id.value,
                    cart_id: cart_id.value,
                    products: product
                }
            });

            if(useCookie("cart_id")) {
                await getCart()
            } 
               
            if(status.value === "success") {
                Cookies.set("cart_id", data.value._id);
                
            }
            
        } catch (error) {
            console.log(error);
            
        }
    } 


   const deleteCart = async (cart_id:string, product_id:string) => {
        const {data, status} = await useAPIFetch(`/cart-delete/${cart_id}/${product_id}`, {
            method:"delete"
        }); 
        const index = cart.value.products.findIndex(item => item.product._id === product_id);
        cart.value.products.splice(index, 1);
        
    }

return {
    cart,
    addProductCart,
    getCart,
    deleteCart
}


});