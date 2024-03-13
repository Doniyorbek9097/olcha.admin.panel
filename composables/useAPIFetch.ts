
export const useAPIFetch = (path:string, options = {}) => {
  const config = useRuntimeConfig();
  const { get, set, remove } = useLocalStorage();
   const lang = useCookie<string>("i18n_redirected");

  
  options.baseURL = config.public.baseURL;
  options.headers = {
    lang: lang.value ?? "uz",
    token: get("token") 
  };
  return $fetch(path, options)
}