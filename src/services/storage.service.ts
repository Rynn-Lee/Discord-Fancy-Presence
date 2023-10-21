export const storageService = {
  set(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeWhole(key: string){
    localStorage.removeItem(key)
  },
  add(storage: string, key: string, value?: any){
    let res = this.get(storage) || []

    Array.isArray(res)
      ? res.push(key)
      : res[key] = value

    this.set(storage, res)
    return res
  },
  remove(storage: string, key: string){
    const res = this.get(storage)
    if(!res){return}
    const updated = res.filter((item: string) => item != key)
    this.set(storage, updated)
    return updated
  },
  get(key: string, ifnull?: any){
    const response = localStorage.getItem(key)
    if(response){
      return JSON.parse(response)
    }
    console.log("key:", key, ifnull && `If null: ${ifnull}`, response && `response: ${response}`)
    if(ifnull){
      this.set(key, ifnull)
      return ifnull
    }
    console.log("IF NULL", key, ifnull)
    return false
  }
}