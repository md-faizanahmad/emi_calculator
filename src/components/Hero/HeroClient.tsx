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
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 px-4 overflow-hidden"
    >
      {/* Decorative Gradient Glow for Desktop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-sky-400/10 blur-[120px] pointer-events-none -z-10" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Modern Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 sm:mb-10 backdrop-blur-md shadow-sm"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase">
            The Smartest Way to Calculate
          </span>
        </motion.div>

        {/* Title: Fluid Typography */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1] px-2"
          style={{ color: "var(--foreground)" }}
        >
          {title.split(" ").map((word, i) => (
            <span
              key={i}
              className={
                word.toLowerCase().includes("emi")
                  ? "text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl opacity-75 mb-10 max-w-2xl mx-auto leading-relaxed px-4"
          style={{ color: "var(--foreground)" }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Section: Better Mobile Padding & Stacking */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8 px-6"
        >
          <Link href={ctaUrl} prefetch={true} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-full sm:w-auto px-8 py-4 bg-sky-400 text-white font-black text-sm uppercase tracking-widest rounded-2xl overflow-hidden shadow-lg shadow-sky-400/25 transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </Link>

          <Link
            href="/about"
            className="text-xs font-black uppercase tracking-[0.2em] hover:text-sky-400 transition-colors py-2"
            style={{ color: "var(--foreground)" }}
          >
            Learn More
          </Link>
        </motion.div>

        {/* Trust Indicators: Optimized for small screens */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-24 pt-8 border-t flex flex-wrap justify-center gap-6 sm:gap-12 opacity-50 transition-all duration-500"
          style={{ borderColor: "var(--border)" }}
        >
          {["Accurate", "Fast", "Free", "Secure"].map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest"
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
