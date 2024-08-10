import Icons from '@/components/icons'
import { service } from '@/services'

export default function Select({ styles, app, setAppInfo }: any) {
  const selectApp = (value: string) => {
    setAppInfo(service.storage.get(value))
    app.setSelectedApp(value)
  }

  const removeApp = (name: string) => {
    if (name == 'Idle') {
      return
    }
    service.storage.removeWhole(name)
    app.setSelectedApp('Idle')
    app.setApps(service.storage.remove('apps', name))
  }

  return (
    <div className={styles.selectApp}>
      <select
        defaultValue={app.selectedApp}
        onChange={e => selectApp(e.target.value)}
      >
        {app?.apps?.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={() => removeApp(app.selectedApp)}>
        <Icons.Remove />
      </button>
    </div>
  )
}
