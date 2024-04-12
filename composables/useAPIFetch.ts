
export const useAPIFetch = (path:string, options = {}) => {
  const config = useRuntimeConfig();
   const lang = useCookie<string>("i18n_redirected");
   const token = useCookie("token");

  
  options.baseURL = config.public.baseURL;
  options.headers = {
    lang: lang.value ?? "uz",
    token: token.value
  };
  return $fetch(path, options)
}