// composables/useLocalStorage.js

export default function useLocalStorage() {
    const set = (key:string, value:any) => {
        process.client && localStorage.setItem(key, JSON.stringify(value))
    };
  
    const get = (key:string) => {
        if(process.client) {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        }
    };
  
    const remove = (key:string) => {
      process.client && localStorage.removeItem(key);
      
    };
  
    return { set, get, remove };
  }
  