export const storage = {
  set(key: string, value: any){
    localStorage.setItem(key, encrypt(value))
  },
  remove(key: string){
    localStorage.removeItem(key)
  },
  get(key: string){
    const response = localStorage.getItem(key)
    if(!response){
      return false
    }
    else{
      return decrypt(response)
    }
  }
}

const encrypt = (data: any) => btoa(JSON.stringify(data))
const decrypt = (data: any) => JSON.parse(atob(data))