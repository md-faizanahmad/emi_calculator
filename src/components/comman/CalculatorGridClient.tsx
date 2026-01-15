"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface Calculator {
  title: string;
  description: string;
  icon: string;
  url: string;
}

interface CalculatorGridClientProps {
  calculators: Calculator[];
}

export default function CalculatorGridClient({
  calculators,
}: CalculatorGridClientProps) {
  return (
    <section className="py-12 overflow-hidden bg-white">
      <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-8 px-4 tracking-tight">
        Our <span className="text-blue-600">EMI Calculators</span>
      </h2>

      {/* 1. Mobile: min-w-[60%] makes the cards significantly narrower/compact
          2. gap-3 reduces dead space between cards
      */}
      <div
        className="flex overflow-x-auto pb-6 px-4 gap-3 snap-x snap-mandatory scrollbar-hide 
                   sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:max-w-6xl sm:mx-auto sm:overflow-visible sm:pb-0"
      >
        {calculators.map((calculator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            // Reduced mobile width to 60% for a "compact" feel
            className="min-w-[60%] sm:min-w-full snap-center bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col justify-between shrink-0"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">
                {calculator.icon}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                {calculator.title}
              </h3>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-4 line-clamp-2">
                {calculator.description}
              </p>
            </div>

            <Link href={calculator.url} className="block w-full">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full text-[11px] sm:text-sm font-bold px-3 py-2 sm:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm uppercase tracking-wide"
              >
                Calculate
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Swipe Indicators */}
      <div className="flex justify-center gap-1 mt-4 sm:hidden">
        {calculators.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-blue-600/20" />
        ))}
      </div>
    </section>
  );
}
