import { invoke } from '@tauri-apps/api/tauri'

export const taskService = {
  async getList(){
    const result = await invoke('get_processes')
    return this.filter(result)
  },
  filter(processes: any){
    const uniqueNames: any = {"fancy-drpc": true};
    const filteredProcesses = processes.filter((process: any) => {
      const name = process.name.split('.')[0]
      if (!uniqueNames[name]){
        uniqueNames[name] = true;
        return true;
      }
      return false;
    });

    const prettified = filteredProcesses.map((item: {id: number, name: string, foreground: boolean}) => ({
      foreground: item.foreground,
      id: item.id,
      name: item.name.split('.')[0]
    }))
    console.log(prettified)
    return prettified
  }
}