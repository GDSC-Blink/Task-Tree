"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export default function AboutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Task Tree</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Task Tree is your ultimate productivity companion. Organize your tasks, track your grades, and
        improve your study techniques, all in one place.
      </p>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Join us today and grow your productivity with Task Tree!
      </p>
      {!isLoggedIn && (
        <a
          href="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
        >
          Get Started
        </a>
      )}
    </div>
  );
}