"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Bug } from "@/app/icons/index";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-15 items-center">
      {/* <Image src="/Bug.svg" alt="Logo" width={25} height={25} /> */}
      <Bug />
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            key={link.label}
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
