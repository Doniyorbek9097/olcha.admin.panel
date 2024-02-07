

export const textSlice = (text:string, start:number = 0, count:number = 50) => {
    if(typeof text == "string") {
        return text.split("").slice(start,count).join(""); 
    }
}

export const fetchData = async (path:string) => {
    try {
      const lang = useCookie<string>('i18n_redirected');
       return await useFetch(`http://localhost:5000/${path}`, {
            headers: {
                lang:lang ?? 'uz'
            }
       })
    } catch (error) {
        console.log(error);
        
    }
}



export const fileReander = (file:any) => {
    return new Promise((resolve, rejact) => {
        const reander = new FileReader();
        if(typeof file == 'string' || file == null || file == undefined) return resolve(file);
        reander.onload = (event:any) =>  resolve(event.target.result);
        reander.onerror = (event:any) =>  rejact(`File base64 formatlashda xato yuz berdi`);
        reander.readAsDataURL(file)
    })

}


export const numberFormater = (number:number): string => {
  return new Intl.NumberFormat('us-US', {style: "currency",  currency: "USB"}).format(number)
}
