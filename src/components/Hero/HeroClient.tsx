"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroClientProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroClient({
  title,
  subtitle,
  ctaText,
  ctaUrl,
}: HeroClientProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-6 lg:pb-16 px-4"
    >
      {/* Background stays global from body grid in globals.css */}

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Modern Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 transition-colors"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold tracking-widest uppercase">
            The Smartest Way to Calculate
          </span>
        </motion.div>

        {/* Title: Premium Bold Look */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1]"
          style={{ color: "var(--foreground)" }}
        >
          {title.split(" ").map((word, i) => (
            <span
              key={i}
              className={
                word.toLowerCase().includes("emi") ? "text-sky-400" : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle: High Contrast & Readability */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--foreground)" }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href={ctaUrl} prefetch={true} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-10 py-4 bg-sky-400 text-white font-bold uppercase rounded-2xl overflow-hidden shadow-xl shadow-sky-400/20 transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Sleek Hover Overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
          </Link>

          <Link
            href="/about"
            className="text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            Learn More
          </Link>
        </motion.div>

        {/* Minimalist Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-20 pt-10 border-t flex flex-wrap justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
          style={{ borderColor: "var(--border)" }}
        >
          {["Accurate", "Fast", "Free", "Secure"].map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: "var(--foreground)" }}
            >
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
