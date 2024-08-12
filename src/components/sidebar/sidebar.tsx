import Link from 'next/link'
import styles from './sidebar.module.sass'
import { useRouter } from 'next/router';
import Icons from '../icons';

export default function Sidebar(){
  const router = useRouter().pathname;
  const activeRouteStyles = (route: string) =>
    route === router ? styles.active : "";

  return (
    <div className={styles.sidebar}>
      <div>
        <Link href={"/"} className={activeRouteStyles("/")}>
          <Icons.display height='20px' width='20px'/>
          Display Settings
        </Link>
        
        <Link href={"/bind-apps"} className={activeRouteStyles("/bind-apps")}>
          <Icons.controller height='20px' width='20px'/>
          Bind Apps
        </Link>
        
        <Link href={"/app-id-list"} className={activeRouteStyles("/app-id-list")}>
          <Icons.find height='20px' width='20px'/>
          App ID List
        </Link>
        
        <Link href={"/events"} className={activeRouteStyles("/events")}>
          <Icons.calendar height='20px' width='20px'/>
          Events
        </Link>
        
        <Link href={"/faq"} className={activeRouteStyles("/faq")}>
          <Icons.faq height='20px' width='20px'/>
          FAQ
        </Link>
        <Link href="/dev" className={activeRouteStyles("/dev")}>Dev View</Link>
      </div>
      <div>
        <Link href={"/settings"} className={activeRouteStyles("/settings")}>
          <Icons.settings height='20px' width='20px'/>
          Settings
        </Link>
        
        <Link href={"/about"} className={activeRouteStyles("/about")}>
          <Icons.info height='20px' width='20px'/>
          About
        </Link>
      </div>
    </div>
  )
}