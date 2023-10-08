import Icon from '@/assets/icons'
import styles from '@styles/sidebar.module.sass'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Sidebar(){
  const router = useRouter();

  return(
    <div className={styles.sidebar}>
      <div className={styles.tab}>
        <Link href="/" className={router.pathname == "/" ? styles.active : ""}><Icon.Display />Display settings</Link>
        <Link href="bind" className={router.pathname == "/bind" ? styles.active : ""}><Icon.App />Bind app</Link>
        <Link href="faq" className={router.pathname == "/faq" ? styles.active : ""}><Icon.FAQ />FAQ</Link>
      </div>
      <div className={styles.tab}>
        <Link href="about" className={router.pathname == "/about" ? styles.active : ""}><Icon.Info />About</Link>
        <Link href="settings" className={router.pathname == "/settings" ? styles.active : ""}><Icon.Settings />Settings</Link>
      </div>
    </div>
  )
}