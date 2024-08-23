import Link from "next/link";
import { useRouter } from "next/router";
import Icons from "./icons";
import { cn } from "@/lib/utils";

const pages = [
  {
    label: "Display Settings",
    icon: Icons.display,
    href: "/",
  },
  {
    label: "Bind Apps",
    icon: Icons.controller,
    href: "/bind-apps",
  },
  {
    label: "App ID List",
    icon: Icons.find,
    href: "/app-id-list",
  },
  {
    label: "Events",
    icon: Icons.calendar,
    href: "/events",
  },
  {
    label: "FAQ",
    icon: Icons.faq,
    href: "/faq",
  },
  {
    label: "Dev View",
    icon: Icons.pen,
    href: "/dev",
  },
];

export default function Sidebar() {
  const pathname = useRouter().pathname;

  return (
    <div className="flex h-screen min-w-56 flex-col justify-between bg-fp-primary-darker">
      <div>
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={cn(
              "flex w-auto items-center px-3 py-2.5 transition-colors hover:text-fp-accent",
              pathname === page.href && "bg-fp-primary-hover text-fp-accent",
            )}
          >
            <page.icon className="mr-1.5" height="20px" width="20px" />
            {page.label}
          </Link>
        ))}
      </div>
      <div>
        <Link
          href={"/settings"}
          className={cn(
            "flex w-auto items-center px-3 py-2.5 transition-colors",
            pathname === "/settings" && "text-fp-link bg-fp-primary-hover",
          )}
        >
          <Icons.settings className="mr-1.5" height="20px" width="20px" />
          Settings
        </Link>

        <Link
          href={"/about"}
          className={cn(
            "flex w-auto items-center px-3 py-2.5 transition-colors",
            pathname === "/about" && "text-fp-link bg-fp-primary-hover",
          )}
        >
          <Icons.info className="mr-1.5" height="20px" width="20px" />
          About
        </Link>
      </div>
    </div>
  );
}
