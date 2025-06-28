import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-15 items-center">
      {/* <Link href="/">Logo</Link> */}
      <Image src="/Bug.svg" alt="Logo" width={25} height={25} />
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            key={link.label}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
