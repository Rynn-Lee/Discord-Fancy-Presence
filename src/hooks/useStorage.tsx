export default function useStorage(){
  const set = (key: string, value: any) => {
    localStorage.setItem(key, encrypt(value))
  }
  const removeWhole = (key: string) => localStorage.removeItem(key)

  const add = (storage: string, key: string, value?: any) => {
    let res = get(storage) || []
    if(Array.isArray(res)){
      res.push(key)
    }
    else{
      res[key] = value
    }
    set(storage, res)
    return res
  }

  const remove = (storage: string, key: string) => {
    let res = get(storage)
    if(!res){return}
    res = res.filter((item: string) => item != key)
    set(storage, res)
    return res
  }

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

  return {set, removeWhole, get, add, remove}
}

const encrypt = (data: any) => btoa(JSON.stringify(data))
const decrypt = (data: any) => JSON.parse(atob(data))