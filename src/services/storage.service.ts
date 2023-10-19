export const storageService = {
  set(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
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
    return JSON.parse(response)
  }
}