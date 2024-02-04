import { useUserStore } from "~/stores/user.store";
// import { IUserStore } from "~/types"
export default defineNuxtRouteMiddleware(async (to, from) => {
   const userStore = useUserStore();
   await userStore.IsAuth();
  //  const { user } = userStore;
   
   const user = {
      role: "admin",
      verified: true
   }
   
   
 if(!user && to.meta.layout !== "register") return navigateTo("/register")

 else if(user && user.role == "admin" && user.verified && to.meta.layout !== "default") {
    return navigateTo("/")
  } 
  

  });

