import { defineStore } from "pinia"
import { useQuasar } from "quasar";
import { useRouter } from "#vue-router";

export const useUserStore = defineStore("userStore", () => {
    const $q = useQuasar();
    const router = useRouter();
    const isShowRegisterForm = ref<boolean>(false);
    const user_id = useCookie("user_id");
    const token = useCookie("token", { maxAge: 60 * 60 })
    const user = ref();
    const setToken = (data?:string) => (token.value = data);
    const setUserId = (data?:any) => (user_id.value = data);
    const setUser = (data:any) => (user.value = data);


    const GetUser = async () => {
        const user_id = useCookie("user_id");
        if(user_id.value && token.value) {
            const res = await useAPIFetch(`/user/${user_id.value}`);   
            setUser(res);
        }
    }

    const Register = async (phone_number: string) => {
        try {
            if (phone_number) {
                const data = await useAPIFetch("/signup", {
                    method: "POST",
                    body: {
                        phone_number
                    }
                });
    
                alert(data)
                return data;
            }
        } catch (error) {
            setToken();
            setUserId();
            console.log(error)
        }

    }


    const VerifyCode = async (otp: string, phone_number: string) => {
        if (otp) {
            const res = await useAPIFetch("/signup/verify", {
                method: "post",
                body: JSON.stringify({
                    phone_number,
                    otp: otp

                })
            });
            
            setToken(res.token);
            setUserId(res?.user._id);
            await GetUser();
            setUser(res)
            router.replace("/")
            return res;

        }

    }


    const EditProfile = async (user) => {
        try {
            const res = await useAPIFetch("/user-update/" + user._id, {
                method: "put",
                body: user
            });

            router.replace('/')

        } catch (error) {
            console.log(error)
        }
    }

    const Logout = () => {
        setToken();
        setUserId();
        setUser(undefined);
        router.replace('/register')
    }


    return {
        Register,
        VerifyCode,
        GetUser,
        EditProfile,
        Logout,
        user,
        isShowRegisterForm
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}