"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is EMI Mitra?",
    answer:
      "EMI Mitra is a platform to calculate and plan your EMI for various products, offering transparent and flexible financing options for purchases like furniture, electronics, and more.",
  },
  {
    question: "What is a Down Payment?",
    answer:
      "A Down Payment is an initial amount you pay upfront when purchasing a product on EMI. It reduces the loan amount, lowering your monthly EMI and total interest payable.",
  },
  {
    question: "What is a Processing Fee?",
    answer:
      "A Processing Fee is a one-time charge applied by lenders to cover the administrative costs of processing your EMI plan. It is added to the total amount you repay.",
  },
  {
    question: "How accurate is the EMI calculator?",
    answer:
      "Our calculator uses standard EMI formulas to provide accurate estimates based on your inputs for product price, down payment, interest rate, tenure, and processing fee.",
  },
  {
    question: "Can I use EMI Mitra for any product?",
    answer:
      "Yes, EMI Mitra supports a wide range of products, including furniture, electronics, appliances, and more, with customizable EMI plans.",
  },
  {
    question: "What are preset amounts, and how do they work?",
    answer:
      "Preset amounts (e.g., ₹2,00,000, ₹5,00,000) are predefined product price options you can select to quickly populate the calculator, making it easier to estimate EMIs for common purchase values.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white/10 rounded-lg p-4 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="text-lg font-medium text-white">{faq.question}</h3>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-300 mt-2">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
