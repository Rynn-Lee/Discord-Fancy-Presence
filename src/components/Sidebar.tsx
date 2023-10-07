import { icons } from '@/assets/icons'
import styles from '@styles/sidebar.module.sass'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar(){
  return(
    <div className={styles.sidebar}>
      <div className={styles.tab}>
        <Link href="/"><Image src={icons.display} alt="display" width={20} height={20}/>Display settings</Link>
        <Link href="bind"><Image src={icons.app} alt="app" width={20} height={20}/>Bind app</Link>
      </div>
      <div className={styles.tab}>
        <Link href="about"><Image src={icons.info} alt="info" width={20} height={20}/>About</Link>
        <Link href="settings"><Image src={icons.settings} alt="settings" width={20} height={20}/>Settings</Link>
      </div>
    </div>
  )
}