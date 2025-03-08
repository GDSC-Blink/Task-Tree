"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // Function to determine the link's styles
  const linkClasses = (href: string) =>
    pathname === href || (href === "/" && pathname === "/dashboard")
      ? "text-black font-bold border-b-2 border-black"
      : "text-gray-500 hover:text-black";

  return (
    <nav className="flex justify-between items-center px-3 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Task Tree</h1>
      <ul className="flex space-x-6 text-sm">
        <li>
          <Link href="/" className={linkClasses("/")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/grades" className={linkClasses("/grades")}>
            Grades
          </Link>
        </li>
        <li>
          <Link href="/study-techniques" className={linkClasses("/study-techniques")}>
            Study
          </Link>
        </li>
        <li>
          <Link href="/profile" className={linkClasses("/profile")}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;