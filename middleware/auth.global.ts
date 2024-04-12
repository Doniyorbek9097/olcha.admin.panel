import { useUserStore } from "~/stores/user.store";
// import { IUserStore } from "~/types"
export default defineNuxtRouteMiddleware(async (to, from) => {
   const userStore = useUserStore()
   await userStore.GetUser();
   const { user } = userStore;
   
 if(user?.role !== "admin" && to.meta.layout !== "register") 
 return navigateTo("/register")
 else if(!user?.verified && to.meta.layout !== "register") 
 return navigateTo("/register")
 else if(user?.role == "admin" && user?.verified && to.meta.layout !== "default") 
 return navigateTo("/")
  
});

