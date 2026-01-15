"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateEMI } from "@/utils/emiCalculator";
import EMIResult from "./EmiResult";
import FAQSection from "./FaqSection";
import Footer from "../comman/Footer";
import { LoanHeader } from "../comman/LoanHeader";

interface EMIData {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  totalProcessingFee: number;
}

const presetAmounts = [200000, 500000, 800000, 1000000, 1200000];

export default function EMICalculatorClient() {
  const [formData, setFormData] = useState({
    amount: "",
    downPayment: "",
    interest: "",
    tenure: "",
    processingFee: "",
  });
  const [emiData, setEmiData] = useState<EMIData | null>(null);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState<
    number | null
  >(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure animations and client-side logic run only after hydration
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Calculate down payment percentage
    if (name === "amount" || name === "downPayment") {
      const amount =
        name === "amount" ? parseFloat(value) : parseFloat(formData.amount);
      const downPayment =
        name === "downPayment"
          ? parseFloat(value)
          : parseFloat(formData.downPayment);
      if (amount && downPayment && amount > 0) {
        setDownPaymentPercentage((downPayment / amount) * 100);
      } else {
        setDownPaymentPercentage(null);
      }
    }
  };

  const handlePresetClick = (amount: number) => {
    setFormData({ ...formData, amount: amount.toString() });
    // Recalculate percentage when preset is selected
    const downPayment = parseFloat(formData.downPayment);
    if (amount && downPayment) {
      setDownPaymentPercentage((downPayment / amount) * 100);
    } else {
      setDownPaymentPercentage(null);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal =
      parseFloat(formData.amount) - (parseFloat(formData.downPayment) || 0);
    const rate = parseFloat(formData.interest);
    const tenure = parseFloat(formData.tenure);
    const processingFee = parseFloat(formData.processingFee) || 0;

    if (principal > 0 && rate && tenure) {
      const result = calculateEMI(principal, rate, tenure, processingFee);
      setEmiData(result);
    }
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            EMI Mitra - Product EMI Calculator
          </h1>
          <div className="text-white text-center">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <>
      <LoanHeader />
      <main className="min-h-screen bg-gradient-to-br from-cyan-600  to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-white/20"
        >
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            EMI Mitra - Product EMI Calculator
          </h1>

          {/* Preset Amounts */}
          <div className="mb-6">
            <h2 className="text-lg text-white mb-3">Select Preset Amount:</h2>
            <div className="flex flex-wrap gap-3">
              {presetAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePresetClick(amount)}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
                >
                  ₹{amount.toLocaleString()}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white mb-2">
                  Product Price (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="e.g. 50000"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">
                  Down Payment (₹)
                </label>
                <input
                  type="number"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleInputChange}
                  placeholder="e.g. 10000"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  placeholder="e.g. 12"
                  step="0.1"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Tenure (Months)</label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  placeholder="e.g. 12"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">
                  Processing Fee (₹)
                </label>
                <input
                  type="number"
                  name="processingFee"
                  value={formData.processingFee}
                  onChange={handleInputChange}
                  placeholder="e.g. 1000"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Calculate EMI
            </motion.button>
          </form>

          {/* EMI Result */}
          <AnimatePresence>
            {emiData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <EMIResult
                  emiData={emiData}
                  downPaymentPercentage={downPaymentPercentage}
                  productPrice={parseFloat(formData.amount) || 0}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Use Cases */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl text-white">Furniture</h3>
                <p className="text-gray-300">
                  Plan your dream home with affordable EMI options for furniture
                  like sofas, beds, and dining tables.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl text-white">Electronics</h3>
                <p className="text-gray-300">
                  Get the latest smartphones, laptops, or TVs with easy EMI
                  plans tailored to your budget.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl text-white">
                Example: ₹50,000 Smartphone
              </h3>
              <p className="text-gray-300">
                Purchase a ₹50,000 smartphone with a ₹10,000 down payment (20%),
                12% interest rate, and ₹1,000 processing fee over 12 months. The
                monthly EMI would be approximately ₹3,691, with a total interest
                of ₹4,294 and total amount of ₹45,294 (including processing
                fee).
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why Choose EMI Mitra?
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Transparent calculations with no hidden fees</li>
              <li>Flexible tenure options to suit your budget</li>
              <li>Instant EMI quotes for better financial planning</li>
              <li>Compare multiple financing options in one place</li>
            </ul>
          </section>

          {/* FAQ */}
          <FAQSection />
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
