import CryptoJs from 'crypto-js'

export const storageService = {
  set(key: string, value: any){
    localStorage.setItem(key, encrypt(value))
  },
  removeWhole(key: string){
    localStorage.removeItem(key)
  },
  add(storage: string, key: string, value?: any){
    let res = this.get(storage) || []
    if(Array.isArray(res)){
      res.push(key)
    }
    else{
      res[key] = value
    }
    this.set(storage, res)
    return res
  },
  remove(storage: string, key: string){
    let res = this.get(storage)
    if(!res){return}
    res = res.filter((item: string) => item != key)
    this.set(storage, res)
    return res
  },
  get(key: string, ifnull?: any){
    const response = localStorage.getItem(key)
    if(!response){
      if(ifnull){
        this.set(key, ifnull)
        return ifnull
      }
      return false
    }
    return decrypt(response)
  }

}

const encrypt = (data: any) =>CryptoJs.AES.encrypt(JSON.stringify(data), 'SomeWhatSecretKey').toString()
const decrypt = (data: any) => {
  const bytes = CryptoJs.AES.decrypt(data, 'SomeWhatSecretKey')
  const decrypred = JSON.parse(bytes.toString(CryptoJs.enc.Utf8))
  return decrypred
}