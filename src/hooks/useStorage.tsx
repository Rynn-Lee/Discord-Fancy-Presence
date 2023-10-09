export default function useStorage(){
  const set = (key: string, value: any) => {
    localStorage.setItem(key, encrypt(value))
  }
  const remove = (key: string) => localStorage.removeItem(key)

  const get = (key: string, ifnull?: any) => {
    const response = localStorage.getItem(key)
    if(!response){
      if(ifnull){
        set(key, ifnull)
        return ifnull
      }
      return false
    }
    return decrypt(response)
  }

  return {set, remove, get}
}

const encrypt = (data: any) => btoa(JSON.stringify(data))
const decrypt = (data: any) => JSON.parse(atob(data))