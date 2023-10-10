const windowsExcludeList = ['nvidia','nvcontainer','amd','intel(r)','intel','svchost',"wuauserv","wscsvc","plugplay","spooler","dnscache","lmhosts",
"lanmanserver","lanmanworkstation","browser","rpcss","trkwks","iphlpsvc","policyagent","eventlog","wscsvc","msiserver","wsearch","winmgmt",
"bits","cryptsvc","schedule","tapisrv","seclogon","netlogon","rpceptmapper","ssdpsrv","shellhwdetection","csrss","win"]

const macosExcludeList = ['nvidia','nvcontainer','amd','intel(r)','Intel',"launchd","kernel_task","WindowServer","Finder","Dock","SystemUIServer","loginwindow","securityd","mds","mdworker","mds_stores","mDNSResponder",
  "opendirectoryd","configd","ntpd","blued","coreservicesd","diskarbitrationd","distnoted","hidd","syslogd","UserEventAgent","powerd","apsd","locationd",
  "coreaudiod","fseventsd","appleeventsd","logind","wirelessproxd","mdnsresponder","calendaragent","cfprefsd (Preferences Daemon)","coreservicesuiagent",
  "imklaunchagent","mdworker_shared","mds_stores","mdworker_shared","secd","apsd","fud","bird","usernoted","identityservicesd","assistantd","suggestd",
  "Safari","Preview","Mail","Messages","Spotlight","Siri","Notification Center","Photoanalysisd","trustd","QuickLookUIService","Google Chrome","Safari Networking",
  "apsd","cfprefsd","Finder Sync"]

const linuxExcludeList = [
  "init","systemd","cron","sshd","httpd","nginx","mysql","postgresql","named","sendmail","rsyslogd","sssd","cupsd","avahi-daemon","dhcpd","nfsd","smbd",
  "nmbd","vsftpd","sssd","nscd","postfix","dovecot","ntpd","dbus-daemon","exim","squid","haproxy","snmpd","ntp","dnsmasq","proftpd","tftp ","sshd","httpd",
  "nginx","rsyslogd","exim","cupsd","smbd","nmbd","avahi-daemon","saslauthd)"]

import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
export default function useProcess(initial?: []){
  const [apps, setApps] = useState<any>(initial)

  useEffect(()=>{
    console.log("apps", apps)
  }, [apps])

  const add = (app: string) => setApps([...apps, app])

  const getList = async () => {
    const result = await invoke('get_processes')
    return filter(result)
  }

  const filter = (processes: any) => {
    const uniqueNames: any = {"fancy-drpc": true};
    const filteredProcesses = processes.filter((process: any) => {
      if (!uniqueNames[process.name]){
        uniqueNames[process.name] = true;
        return true;
      }
      return false;
    });
    const prettified = filteredProcesses.map((item: {id: number, name: string}) => ({id: item.id, name: item.name.split('.')[0]}))
    return prettified
  }

  return{getList, apps, setApps, add}
}