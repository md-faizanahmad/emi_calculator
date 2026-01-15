"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is the New Tax Regime?",
    answer:
      "The New Tax Regime, introduced in 2020, offers lower tax rates but removes most exemptions and deductions (e.g., HRA, 80C). It’s simpler and benefits those with fewer investments.",
  },
  {
    question: "What is the Old Tax Regime?",
    answer:
      "The Old Tax Regime allows higher tax rates but includes various exemptions and deductions like HRA, LTA, and Section 80C investments, making it suitable for those with significant savings.",
  },
  {
    question: "What is Provident Fund (PF)?",
    answer:
      "Provident Fund (PF) is a mandatory retirement savings scheme in India where both employee and employer contribute 12% of the basic salary. It’s capped at ₹1800/month for most employees and offers tax benefits.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left p-3 bg-white/30 rounded-lg border border-gray-200/50 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-sm font-medium text-gray-800">
                {faq.question}
              </span>
              <span className="text-gray-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </motion.button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-3 bg-white/50 rounded-lg text-sm text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQSection;
