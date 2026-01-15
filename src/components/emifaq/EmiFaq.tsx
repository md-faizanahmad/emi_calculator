// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";

// const faqData = [
//   {
//     question: "What is an EMI?",
//     answer:
//       "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month, covering both principal and interest.",
//   },
//   {
//     question: "How accurate are EMI Mitra’s calculators?",
//     answer:
//       "Our calculators use standard financial formulas to provide accurate EMI estimates based on your inputs. Always consult with your lender for final terms.",
//   },
//   {
//     question: "Is EMI Mitra free to use?",
//     answer:
//       "Yes, all our calculators are free to use with no login required, ensuring quick and easy access.",
//   },
//   {
//     question: "What is a Home Loan EMI Calculator?",
//     answer:
//       "A home loan EMI calculator is a tool to estimate your monthly EMI (Equated Monthly Installment) for a home loan. It calculates payments based on the loan amount, interest rate, and tenure. For example, a ₹20,00,000 home loan at 8% interest for 10 years has an EMI of approximately ₹29,882. Use our home loan EMI calculator for accurate results.",
//   },
//   {
//     question:
//       "What is the difference between flat rate and reducing balance rate in a loan calculator?",
//     answer:
//       "In a **flat rate** loan, interest is calculated on the initial loan amount for the entire tenure, resulting in higher EMIs. For example, a ₹1,00,000 loan at 10% flat rate for 3 years charges ₹30,000 interest. In a **reducing balance** loan, interest is calculated on the outstanding principal each month, reducing total interest. Use our loan calculator to compare flat and reducing rates for car loans or personal loans.",
//   },
//   {
//     question: "How does a car loan calculator work?",
//     answer:
//       "A car loan calculator estimates your monthly EMI for a car loan based on the loan amount, interest rate, and tenure. For example, a ₹5,00,000 car loan at 7% interest for 3 years has an EMI of approximately ₹15,103. Our car loan calculator also accounts for down payments and processing fees to provide accurate car payment calculations.",
//   },
//   {
//     question: "What is loan tenure in a payment calculator?",
//     answer:
//       "Loan tenure is the duration over which you repay a loan through EMIs, typically in months or years. For example, a car loan might have a 36-month tenure, while a home loan could span 240 months. Longer tenures reduce EMIs but increase total interest. Use our payment calculator to find the ideal tenure for your loan.",
//   },
//   {
//     question: "What is a processing fee in an automotive loan calculator?",
//     answer:
//       "A processing fee is a charge by lenders to cover loan application costs, usually 0.5% to 2% of the loan amount. For example, a ₹10,00,000 automotive loan with a 1% fee incurs ₹10,000. Our automotive loan calculator includes processing fees to estimate your total loan cost accurately.",
//   },
//   {
//     question: "What happens if I miss a car loan payment?",
//     answer:
//       "Missing a car loan payment incurs late fees, damages your credit score, and may lead to lender recovery actions. Repeated defaults could result in vehicle repossession. Use our car payment calculator to ensure your EMIs are affordable and contact your lender if payment issues arise.",
//   },
//   {
//     question: "Can I prepay my loan using a loan calculator?",
//     answer:
//       "Yes, prepaying a loan reduces the principal, lowering EMIs or shortening the tenure. Some lenders charge a prepayment penalty (1-3%). Our loan calculator helps estimate savings from prepayment for personal, home, or car loans, especially early in the tenure when interest is high.",
//   },
//   {
//     question: "How does a down payment affect a car loan calculator?",
//     answer:
//       "A down payment is an upfront payment for a car purchase, reducing the loan amount and EMI. For example, a ₹5,00,000 car with a ₹1,00,000 down payment requires a ₹4,00,000 loan, lowering EMIs. Use our car loan calculator to see how down payments impact your monthly car payments.",
//   },
// ];

// const structuredData = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   mainEntity: faqData.map((faq) => ({
//     "@type": "Question",
//     name: faq.question,
//     acceptedAnswer: {
//       "@type": "Answer",
//       text: faq.answer,
//     },
//   })),
// };

// const EmiFaq: React.FC = () => {
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-md"
//       aria-labelledby="emi-faq-heading"
//     >
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />
//       <h2
//         id="emi-faq-heading"
//         className="text-xl sm:text-2xl font-bold text-gray-900 mb-6"
//       >
//         Frequently Asked Questions about EMI and Loan Calculators
//       </h2>
//       <div className="space-y-4">
//         {faqData.map((faq, index) => (
//           <details
//             key={index}
//             className="border border-gray-200 rounded-md shadow-sm group"
//           >
//             <summary className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors p-4 cursor-pointer">
//               <span className="text-base sm:text-lg font-semibold text-gray-800">
//                 {faq.question}
//               </span>
//               <ChevronDown className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform" />
//             </summary>
//             <div className="bg-white p-4">
//               <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
//                 {faq.answer}
//               </p>
//             </div>
//           </details>
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default EmiFaq;
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

// faqData remains the same as your provided list...
const faqData = [
  {
    question: "What is an EMI?",
    answer:
      "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month, covering both principal and interest.",
  },
  {
    question: "How accurate are EMI Mitra’s calculators?",
    answer:
      "Our calculators use standard financial formulas to provide accurate EMI estimates based on your inputs. Always consult with your lender for final terms.",
  },
  {
    question: "Is EMI Mitra free to use?",
    answer:
      "Yes, all our calculators are free to use with no login required, ensuring quick and easy access.",
  },
  {
    question: "What is a Home Loan EMI Calculator?",
    answer:
      "A home loan EMI calculator is a tool to estimate your monthly EMI (Equated Monthly Installment) for a home loan. It calculates payments based on the loan amount, interest rate, and tenure. For example, a ₹20,00,000 home loan at 8% interest for 10 years has an EMI of approximately ₹29,882. Use our home loan EMI calculator for accurate results.",
  },
  {
    question:
      "What is the difference between flat rate and reducing balance rate in a loan calculator?",
    answer:
      "In a **flat rate** loan, interest is calculated on the initial loan amount for the entire tenure, resulting in higher EMIs. For example, a ₹1,00,000 loan at 10% flat rate for 3 years charges ₹30,000 interest. In a **reducing balance** loan, interest is calculated on the outstanding principal each month, reducing total interest. Use our loan calculator to compare flat and reducing rates for car loans or personal loans.",
  },
  {
    question: "How does a car loan calculator work?",
    answer:
      "A car loan calculator estimates your monthly EMI for a car loan based on the loan amount, interest rate, and tenure. For example, a ₹5,00,000 car loan at 7% interest for 3 years has an EMI of approximately ₹15,103. Our car loan calculator also accounts for down payments and processing fees to provide accurate car payment calculations.",
  },
  {
    question: "What is loan tenure in a payment calculator?",
    answer:
      "Loan tenure is the duration over which you repay a loan through EMIs, typically in months or years. For example, a car loan might have a 36-month tenure, while a home loan could span 240 months. Longer tenures reduce EMIs but increase total interest. Use our payment calculator to find the ideal tenure for your loan.",
  },
  {
    question: "What is a processing fee in an automotive loan calculator?",
    answer:
      "A processing fee is a charge by lenders to cover loan application costs, usually 0.5% to 2% of the loan amount. For example, a ₹10,00,000 automotive loan with a 1% fee incurs ₹10,000. Our automotive loan calculator includes processing fees to estimate your total loan cost accurately.",
  },
  {
    question: "What happens if I miss a car loan payment?",
    answer:
      "Missing a car loan payment incurs late fees, damages your credit score, and may lead to lender recovery actions. Repeated defaults could result in vehicle repossession. Use our car payment calculator to ensure your EMIs are affordable and contact your lender if payment issues arise.",
  },
  {
    question: "Can I prepay my loan using a loan calculator?",
    answer:
      "Yes, prepaying a loan reduces the principal, lowering EMIs or shortening the tenure. Some lenders charge a prepayment penalty (1-3%). Our loan calculator helps estimate savings from prepayment for personal, home, or car loans, especially early in the tenure when interest is high.",
  },
  {
    question: "How does a down payment affect a car loan calculator?",
    answer:
      "A down payment is an upfront payment for a car purchase, reducing the loan amount and EMI. For example, a ₹5,00,000 car with a ₹1,00,000 down payment requires a ₹4,00,000 loan, lowering EMIs. Use our car loan calculator to see how down payments impact your monthly car payments.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const EmiFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first one open

  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Sidebar: Header */}
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageCircleQuestion size={14} /> Help Center
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-tight mb-4">
              Everything you need to <span className="text-blue-600">Know</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Find answers to the most common questions about loan calculations,
              interest rates, and financial planning.
            </p>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="md:w-2/3 space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden transition-all duration-300 rounded-2xl border ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/30 shadow-sm"
                    : "border-gray-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span
                    className={`text-base font-bold transition-colors ${
                      isOpen ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="h-px w-full bg-gray-100 mb-4" />
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmiFaq;
