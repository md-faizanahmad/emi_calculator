// app/components/CalculatorGridClient.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Define TypeScript interface for calculator prop
interface Calculator {
  title: string;
  description: string;
  icon: string;
  url: string;
}

// Define props interface
interface CalculatorGridClientProps {
  calculators: Calculator[];
}

export default function CalculatorGridClient({
  calculators,
}: CalculatorGridClientProps) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Our EMI Calculators
      </h2>
      <div className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <span className="text-4xl mb-4 block">{calculator.icon}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {calculator.title}
            </h3>
            <p className="text-gray-600 mb-4">{calculator.description}</p>
            <Link href={calculator.url}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Calculate Now
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
