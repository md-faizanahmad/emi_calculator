"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// Header animation variants
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Nav link animation variants
const navLinkVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    y: -2,
    color: "#60a5fa",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
    y: 0,
    color: "#3b82f6",
    transition: { duration: 0.1 },
  },
};

// Mobile menu animation variants
const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export const LoanHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home Loan",
      path: "/calculators/homeloan",
      title: "Home Loan EMI Calculator",
    },
    {
      name: "Vehicle Loan",
      path: "/calculators/vehicleloan",
      title: "Vehicle Loan EMI Calculator",
    },
    {
      name: "On Salary",
      path: "/calculators/basedonsalary",
      title: "Salary-Based Loan Calculator",
    },
    {
      name: "Gadget Loan",
      path: "/calculators/gadgetloan",
      title: "Gadget Loan EMI Calculator",
    },
    {
      name: "Salary Break-up",
      path: "/calculators/salarybreakup",
      title: "Salary Breakup in Hand",
    },
  ];

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="sticky top-0 z-50    py-4 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center  ">
        {/* Logo and Site Name */}

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <motion.div
                  variants={navLinkVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <Link
                    href={item.path}
                    prefetch={true}
                    title={item.title}
                    className={`text-base lg:text-lg font-medium transition-colors ${
                      pathname === item.path
                        ? "text-blue-400 font-semibold"
                        : " text-black"
                    } hover:text-gray-500 rounded-md px-3 py-1`}
                    aria-current={pathname === item.path ? "page" : undefined}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5  shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                        layoutId="underline"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800  p-2 rounded-full hover:bg-blue-500/20 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileMenuOpen ? (
            <X size={28} className="text-blue-400" />
          ) : (
            <Menu size={28} className="text-blue-400" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        className="md:hidden overflow-hidden  text-black  backdrop-blur-lg shadow-lg"
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col items-start gap-4 py-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.div
                variants={navLinkVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="w-full text-right"
              >
                <Link
                  href={item.path}
                  prefetch={true}
                  title={item.title}
                  className={`text-lg font-medium transition-colors px-4 py-2 rounded-md ${
                    pathname === item.path
                      ? "text-blue-400 font-semibold bg-blue-500/10"
                      : "text-gray-800 dark:text-black"
                  } hover:bg-blue-500/20`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={pathname === item.path ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  );
};
