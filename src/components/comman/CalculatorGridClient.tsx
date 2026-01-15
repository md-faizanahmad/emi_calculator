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
    <section className="py-12 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 px-4">
        Our EMI Calculators
      </h2>

      {/* Mobile: flex row with horizontal scroll and snapping 
          Desktop: Standard grid
      */}
      <div
        className="flex overflow-x-auto pb-6 px-4 gap-4 snap-x snap-mandatory scrollbar-hide 
                      sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl sm:mx-auto sm:overflow-visible sm:pb-0"
      >
        {calculators.map((calculator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            // Compact Mobile: min-w-[70%] and p-5
            // Desktop: min-w-full and p-6
            className="min-w-[70%] sm:min-w-full snap-center bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col justify-between shrink-0"
          >
            <div>
              <span className="text-3xl sm:text-4xl mb-3 block">
                {calculator.icon}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {calculator.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 sm:line-clamp-none">
                {calculator.description}
              </p>
            </div>

            <Link href={calculator.url} className="block w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-sm font-semibold px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Calculate Now
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Swipe Indicators */}
      <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
        {calculators.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-blue-600/20" />
        ))}
      </div>
    </section>
  );
}
