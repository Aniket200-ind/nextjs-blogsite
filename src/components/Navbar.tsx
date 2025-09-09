//! File: src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ThemeDropdown } from "./ThemeDropdown";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tags", href: "/tags" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-theme-border bg-theme-bg/95 backdrop-blur supports-[backdrop-filter]:bg-theme-bg/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 bg-gradient-to-br from-theme-accent to-theme-highlight transform items-center justify-center rounded-lg bg-theme-accent transition-transform group-hover:scale-110 duration-200">
              <span className="text-lg font-bold text-theme-accent-text">
                D
              </span>
            </div>
            <span className="text-xl font-bold text-theme-text font-montserrat">DevPulse</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-body",
                  isActive(item.href)
                      ? "bg-theme-accent text-theme-accent-text shadow-lg"
                      : "text-theme-text hover:text-theme-accent hover:bg-theme-secondary-bg"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeDropdown />

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden border-t border-theme-border overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 font-body",
                  isActive(item.href)
                        ? "bg-theme-accent text-theme-accent-text"
                        : "text-theme-text hover:text-theme-accent hover:bg-theme-secondary-bg"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
