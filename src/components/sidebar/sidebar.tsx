import Icons from "@/components/icons";
import styles from "./sidebar.module.sass";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const activeRouteStyles = (route: string) =>
    route === router.pathname ? styles.active : "";

  return (
    <div className={styles.sidebar}>
      <div className={styles.tab}>
        <Link href="/" className={activeRouteStyles("/")}>
          <Icons.Display />
          Display Settings
        </Link>
        <Link href="bind" className={activeRouteStyles("/bind")}>
          <Icons.Controller />
          Bind Apps
        </Link>
        <Link href="events" className={activeRouteStyles("/events")}>
          <Icons.Calendar />
          Events
        </Link>
        <Link href="faq" className={activeRouteStyles("/faq")}>
          <Icons.FAQ />
          FAQ
        </Link>
      </div>
      <div className={styles.tab}>
        <Link href="about" className={activeRouteStyles("/about")}>
          <Icons.Info />
          About
        </Link>
        <Link href="settings" className={activeRouteStyles("/settings")}>
          <Icons.Settings />
          Settings
        </Link>
      </div>
    </div>
  );
}
