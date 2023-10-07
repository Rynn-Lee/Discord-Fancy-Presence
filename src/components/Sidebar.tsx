import { icons } from '@/assets/icons'
import styles from '@styles/sidebar.module.sass'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Sidebar(){
  const router = useRouter();

  return(
    <div className={styles.sidebar}>
      <div className={styles.tab}>
        <Link href="/" className={router.pathname == "/" ? styles.active : ""}><Image src={icons.display} alt="display" width={20} height={20}/>Display settings</Link>
        <Link href="bind" className={router.pathname == "/bind" ? styles.active : ""}><Image src={icons.app} alt="app" width={20} height={20}/>Bind app</Link>
      </div>
      <div className={styles.tab}>
        <Link href="about" className={router.pathname == "/about" ? styles.active : ""}><Image src={icons.info} alt="info" width={20} height={20}/>About</Link>
        <Link href="settings" className={router.pathname == "/settings" ? styles.active : ""}><Image src={icons.settings} alt="settings" width={20} height={20}/>Settings</Link>
      </div>
    </div>
  )
}