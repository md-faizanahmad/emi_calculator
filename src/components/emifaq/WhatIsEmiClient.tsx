// app/components/WhatIsEmiClient.tsx (Client Component)
"use client";
import { motion } from "framer-motion";
import { PieChart, TrendingDown, Calendar, ArrowRight } from "lucide-react";

const factors = [
  {
    icon: <PieChart className="text-blue-600" />,
    title: "Principal Amount",
    desc: "The initial sum of money borrowed from the lender.",
  },
  {
    icon: <TrendingDown className="text-emerald-600" />,
    title: "Interest Rate",
    desc: "The annual percentage rate charged on the loan.",
  },
  {
    icon: <Calendar className="text-purple-600" />,
    title: "Loan Tenure",
    desc: "The duration in months or years to repay the loan.",
  },
];

export default function WhatIsEmiClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Formula Card - Animated */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="lg:col-span-5 bg-gray-900 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <ArrowRight size={120} className="-rotate-45 text-white" />
        </div>

        <h3 className="text-white text-xl font-bold mb-6">The EMI Formula</h3>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <code className="text-blue-300 text-lg md:text-xl font-mono block text-center">
            EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
          </code>
        </div>
        <div className="mt-6 space-y-2 text-xs text-gray-400 font-mono">
          <p>P = Principal Loan Amount</p>
          <p>R = Monthly Interest Rate</p>
          <p>N = Number of Monthly Installments</p>
        </div>
      </motion.div>

      {/* Factors Grid - Staggered Animation */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-1 gap-4">
        {factors.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
