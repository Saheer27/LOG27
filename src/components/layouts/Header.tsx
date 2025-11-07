"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/newLogs", label: "+ Add" },
  { href: "/reports", label: "Reports" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    const demoFlag = localStorage.getItem("isDemo");
    setIsDemo(demoFlag === "true");
  }, [pathname]);

  const handleReset = () => {
    if (confirm("Are you sure?")) {
      localStorage.clear();
      localStorage.setItem("isDemo", "false");
      window.location.reload();
    }
  };

  return (
    <header className="bg-indigo-500 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/dashboard" className="text-xl sm:text-2xl font-bold">
          LOG27
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-3 rounded transition ${
                pathname === link.href ? "bg-indigo-600" : "hover:bg-indigo-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Button
            className={`px-3 py-2 rounded-md text-sm font-semibold ${
              isDemo
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={handleReset}
          >
            {isDemo ? "Start Now" : "⚙ Reset"}
          </Button>
        </nav>

        <Button
          className="md:hidden p-3 hover:bg-indigo-700 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-indigo-500 p-4">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`p-3 rounded transition ${
                  pathname === link.href
                    ? "bg-indigo-600"
                    : "hover:bg-indigo-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className={`px-3 py-2 rounded-md text-sm font-semibold ${
                isDemo
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={handleReset}
            >
              {isDemo ? "Start Now" : "⚙ Reset"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
