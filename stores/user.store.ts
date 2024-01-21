import { IUserStore } from "~/types"
import { defineStore } from "pinia"
import { useQuasar } from "quasar";
import { useFetch } from "#app"
type useFetchType = typeof useFetch;

import { useRouter } from "#vue-router";


export const useUserStore = defineStore("userStore", () => {
    const $q = useQuasar();
    const router = useRouter();
    const user = ref<unknown>(null);
    const statusMessage = ref<string>("");
    const errorMessage = ref<string>("");
    const isShowRegisterForm = ref<boolean>(false);


    const IsAuth = async () => {
        const user_id = $q.cookies.get("user_id") ?? null;
        const token =  $q.cookies.get("token") ?? null;

        if(user_id && token) {
            const { data, status } = await useAPIFetch(`/user/${user_id}`);
            
             status.value == "success" && (user.value = data.value);
             status.value == "error" && (
                $q.notify({
                    message: "User topilmadi",
                    color: "red",
                    position: "top-right"
                })
             );     
        } 

    }

    const Register = async (phone_number:string) => {

        const { status, data, error } = await useAPIFetch("/signup", {
                method: "POST",
                body: {
                    phone_number:"998" + phone_number.split(" ").join("")
                }
            });
            
                status.value == "success" && (
                    $q.notify({
                        message: `${phone_number} ga sms yuborildi Iltimos tasdiqlang`,
                        color: "green",
                        position: "top-right"
                    })
                );

                status.value == "error" && (
                    $q.notify({
                        message: "Serverda Xatolik",
                        color: "red",
                        position: "top-right"
                    })
                )


            }


    const VerifyCode = async (otpCode: string, phone_number:string) => {
        statusMessage.value = "";
        errorMessage.value = "";
        if (otpCode) {
            const { data, error, status } = await useAPIFetch<any>("/signup/verify", {
                method: "post",
                body: JSON.stringify({
                    phone_number: "998"+ phone_number.split(" ").join(""),
                    otp: otpCode.toString()

                })
            })

                status.value == "success" && (
                $q.notify({
                    message: "Muoffaqqiyatli Ro'yxatdan o'tdingiz",
                    color: "green",
                    position: "top-right"
                }),
                $q.cookies.set("user_id", data.value.user._id),
                $q.cookies.set("token", data.value.token, { expires: "7d" }),
                window.location.reload()

                );

                status.value == "error" && (
                    $q.notify({
                        message: "Serverda Xatolik",
                        color: "red",
                        position: "top-right"
                    })
                );

        }

    }


    return {
        Register,
        VerifyCode,
        IsAuth,
        user,
        statusMessage,
        errorMessage,
        isShowRegisterForm
    }
})
