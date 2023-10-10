import { invoke } from '@tauri-apps/api'
import { AppProcess } from './types'

const getSystemProcesses = async (): Promise<AppProcess[]> => {
  return invoke('get_processes')
}

const api = {
  getSystemProcesses
}

export default api
