"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Function to determine the link's styles
  const linkClasses = (href: string, disabled: boolean = false) =>
    disabled
      ? "text-gray-400 border-dashed border-gray-400 border px-2 py-1 rounded cursor-not-allowed"
      : pathname === href
      ? "text-black font-bold border-b-2 border-black"
      : "text-gray-500 hover:text-black";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-3 py-4">
        {/* Task Tree Logo */}
        <Link href="/" className="text-2xl font-bold">
          Task Tree
        </Link>
        <ul className="flex space-x-6 text-sm">
          {/* About Page */}
          <li>
            <Link href="/" className={linkClasses("/")}>
              About
            </Link>
          </li>
          {/* Dashboard Link */}
          <li>
            <Link
              href={isLoggedIn ? "/dashboard" : "#"}
              className={linkClasses("/dashboard", !isLoggedIn)}
            >
              Dashboard
            </Link>
          </li>
          {/* Grades Link */}
          <li>
            <Link
              href={isLoggedIn ? "/grades" : "#"}
              className={linkClasses("/grades", !isLoggedIn)}
            >
              Grades
            </Link>
          </li>
          {/* Study Techniques Link */}
          <li>
            <Link href="/study-techniques" className={linkClasses("/study-techniques")}>
              Study
            </Link>
          </li>
          {/* Profile or Login Link */}
          <li>
            <Link
              href={isLoggedIn ? "/profile" : "/login"}
              className={linkClasses(isLoggedIn ? "/profile" : "/login")}
            >
              {isLoggedIn ? "Profile" : "Login"}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;