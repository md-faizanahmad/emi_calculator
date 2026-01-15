"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Menu, X } from "lucide-react";
// import { useTheme } from "next-themes";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "FAQs", path: "/emifaq" },
    { name: "Contact", path: "/contact_us" },
  ];

  if (!mounted) return <div className="h-20" />; // Prevent jump during load

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Nav Container */}
        <nav
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
          className="relative flex items-center justify-between px-6 py-2 rounded-2xl border backdrop-blur-xl shadow-xl transition-all"
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-sky-400/10">
              <Calculator className="w-6 h-6 text-sky-400" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              Emi<span className="text-sky-400">Mitra</span>
            </span>
          </Link>

          {/* Desktop Navigation - Button Style */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-sky-400 text-white shadow-lg shadow-sky-400/30"
                      : "hover:bg-[var(--nav-hover)]"
                  }`}
                  style={{ color: isActive ? "#fff" : "var(--foreground)" }}
                >
                  {item.name}
                </Link>
              );
            })}

            <div
              className="w-[1px] h-6 mx-2"
              style={{ backgroundColor: "var(--border)" }}
            />

            {/* Premium Theme Switcher Button */}
            {/* <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl transition-all hover:ring-2 ring-sky-400"
              style={{
                backgroundColor: "var(--nav-hover)",
                color: "var(--foreground)",
              }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button> */}
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2"
              style={{ color: "var(--foreground)" }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg"
              style={{
                backgroundColor: "var(--nav-hover)",
                color: "var(--foreground)",
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
              }}
              className="absolute left-4 right-4 mt-3 p-3 rounded-2xl border shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      pathname === item.path
                        ? "bg-sky-400 text-white"
                        : "hover:bg-[var(--nav-hover)]"
                    }`}
                    style={{
                      color:
                        pathname === item.path ? "#fff" : "var(--foreground)",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
