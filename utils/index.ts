

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

export const showViewSumma = (price:string) => {
    let summa:string[] = parseInt(price).toString().split("");
    let showSumma = [];
    let chunksumma = [];

    for (const index  in summa) {
        const Index:number = parseInt(index);
        chunksumma.push(summa[Index]);
        summa.splice(Index, 1);

        if(chunksumma.length >= 3) {
            showSumma.push(chunksumma);
            chunksumma = [];
        }
    
    }

    
    return showSumma.join(" ").split(",").join("")+"."+summa.join("");
    
}


export const fileReander = async (files:object[], callback:any) => {
    if(Array.isArray(files) && files !== null) {
        const resultArray:[] = [];
        let fileToRead = files.length;

       if(fileToRead == 0) {
        callback(null, resultArray)
       }

       const headleFileRead = (event) => {
            resultArray.push(event.target.result);
            fileToRead--;
            if(fileToRead == 0) {
                callback(null, resultArray);
            }
       }


       const headleFileError = (event) => {
            callback(`Xato yuz berdi ${event.target.error}`)
       }
       
       files.forEach(file => {
        const reander = new FileReader();
        reander.onload = headleFileRead;
        reander.onerror = headleFileError;
        reander.readAsDataURL(file)
       }) 
    } 

    else {
        const reander = new FileReader();
        if(files == "" || files == null || files == undefined) return;
        reander.onload = (event) =>  callback(null, event.target.result);
        reander.onerror = (event) =>  callback(`Xato yuz berdi: ${event.target?.error}`);
        reander.readAsDataURL(files)
    }  

}


export const numberFormater = (number:number): string => {
  return new Intl.NumberFormat('us-US', {style: "currency",  currency: "USB"}).format(number)
}
