import { useFetch } from "#app";
type useFetchType = typeof useFetch;

export const useAPIFetch:useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();
  const { get, set, remove } = useLocalStorage();
   const lang = useCookie<string>("i18n_redirected");

  
  options.baseURL = config.public.baseURL;
  options.headers = {
    lang:lang.value ?? "uz",
    token:get("token") 
  };
  return useFetch(path, options)
}