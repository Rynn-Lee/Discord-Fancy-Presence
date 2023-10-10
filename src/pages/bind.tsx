import api from '@/lib/api'
import { invoke } from '@tauri-apps/api/tauri'

export default function Bind() {
  const handleGetProcesses = async () => {
    const res = await api.getSystemProcesses()
    console.log(res)
  }

  return (
    <div>
      Bind Apps
      <button onClick={handleGetProcesses}>Get processes</button>
    </div>
  )
}
