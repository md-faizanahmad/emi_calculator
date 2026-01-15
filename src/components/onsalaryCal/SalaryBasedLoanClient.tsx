"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Result from "./SalaryResult";
import {
  LoanInputs,
  LoanOutput,
  ValidationErrors,
  calculateLoanDetails,
  validateInputs,
} from "@/utils/salaryutils";
import { LoanHeader } from "../comman/LoanHeader";
import Footer from "../comman/Footer";

// Animation variants for inputs
const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  blur: { scale: 1, transition: { duration: 0.2 } },
};

export default function SalaryBasedLoanCalculatorClient() {
  const [inputs, setInputs] = useState<LoanInputs>({
    monthlySalary: 30000,
    interestRate: 11,
    desiredEmi: 8000,
    loanTenure: 3,
    downPaymentPercentage: 20,
  });
  const [result, setResult] = useState<LoanOutput | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    const validationErrors = validateInputs(inputs);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setResult(calculateLoanDetails(inputs));
    } else {
      setResult(null);
    }
  }, [inputs]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handlePresetEmi = (emi: number) => {
    setInputs((prev) => ({ ...prev, desiredEmi: emi }));
  };

  const handleReset = () => {
    setInputs({
      monthlySalary: 30000,
      interestRate: 11,
      desiredEmi: 8000,
      loanTenure: 3,
      downPaymentPercentage: 20,
    });
    setErrors({});
  };

  return (
    <>
      <LoanHeader />
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-black bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
        <div className="max-w-4xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <label
                  htmlFor="monthlySalary"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Monthly Salary ({currency === "INR" ? "₹" : "$"})
                </label>
                <input
                  type="number"
                  name="monthlySalary"
                  id="monthlySalary"
                  value={inputs.monthlySalary}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-describedby="monthlySalary-help"
                  required
                />
                {errors.monthlySalary && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.monthlySalary}
                  </p>
                )}
                <p
                  id="monthlySalary-help"
                  className="text-xs text-gray-300 mt-1"
                >
                  Enter your net monthly take-home salary.
                </p>
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <label
                  htmlFor="interestRate"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Expected Interest Rate (%)
                </label>
                <input
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  value={inputs.interestRate}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-describedby="interestRate-help"
                  required
                />
                {errors.interestRate && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.interestRate}
                  </p>
                )}
                <p
                  id="interestRate-help"
                  className="text-xs text-gray-300 mt-1"
                >
                  Typical rates range from 8% to 15%.
                </p>
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <label
                  htmlFor="desiredEmi"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Desired EMI per Month ({currency === "INR" ? "₹" : "$"})
                </label>
                <input
                  type="number"
                  name="desiredEmi"
                  id="desiredEmi"
                  value={inputs.desiredEmi}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-describedby="desiredEmi-help"
                  required
                />
                {errors.desiredEmi && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.desiredEmi}
                  </p>
                )}
                <p id="desiredEmi-help" className="text-xs text-gray-300 mt-1">
                  Enter the EMI you can comfortably pay monthly.
                </p>
                <div className="flex gap-2 mt-2">
                  {[5000, 10000, 15000, 20000].map((emi) => (
                    <motion.button
                      key={emi}
                      onClick={() => handlePresetEmi(emi)}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currency === "INR" ? "₹" : "$"}
                      {emi.toLocaleString()}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <label
                  htmlFor="loanTenure"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Loan Tenure (Years)
                </label>
                <select
                  name="loanTenure"
                  id="loanTenure"
                  value={inputs.loanTenure}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-describedby="loanTenure-help"
                >
                  {[1, 2, 3, 4, 5, 7, 10].map((year) => (
                    <option key={year} value={year}>
                      {year} {year === 1 ? "year" : "years"}
                    </option>
                  ))}
                </select>
                {errors.loanTenure && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.loanTenure}
                  </p>
                )}
                <p id="loanTenure-help" className="text-xs text-gray-300 mt-1">
                  Choose the loan repayment period.
                </p>
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <label
                  htmlFor="downPaymentPercentage"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Down Payment Percentage (%)
                </label>
                <input
                  type="number"
                  name="downPaymentPercentage"
                  id="downPaymentPercentage"
                  value={inputs.downPaymentPercentage}
                  onChange={handleInputChange}
                  step="1"
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-describedby="downPaymentPercentage-help"
                  required
                />
                {errors.downPaymentPercentage && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.downPaymentPercentage}
                  </p>
                )}
                <p
                  id="downPaymentPercentage-help"
                  className="text-xs text-gray-300 mt-1"
                >
                  Enter the percentage of the loan amount for down payment
                  (0-50%).
                </p>
              </motion.div>
            </form>

            <div className="flex gap-4 mt-4">
              <motion.button
                onClick={handleReset}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition transform hover:scale-105"
                aria-label="Reset form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset to Defaults
              </motion.button>
              <motion.button
                onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition transform hover:scale-105"
                aria-label="Toggle currency"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Switch to {currency === "INR" ? "USD" : "INR"}
              </motion.button>
              <motion.button
                onClick={() => setShowTips(!showTips)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition transform hover:scale-105"
                aria-label="Toggle affordability tips"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showTips ? "Hide Tips" : "Show Tips"}
              </motion.button>
            </div>

            {/* Affordability Tips */}
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20"
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  Loan Affordability Tips
                </h3>
                <ul className="list-disc list-inside text-gray-200 space-y-2 text-sm">
                  <li>
                    Keep your EMI below 40% of your take-home salary for
                    financial safety.
                  </li>
                  <li>
                    Consider a longer tenure to reduce monthly EMI, but note
                    higher total interest.
                  </li>
                  <li>
                    A higher down payment (20-30%) reduces your loan amount and
                    interest burden.
                  </li>
                  <li>
                    Check your credit score before applying to secure better
                    interest rates.
                  </li>
                  <li>
                    Compare offers from multiple banks for the best terms.
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Results Section */}
          <Result
            result={result}
            monthlySalary={inputs.monthlySalary}
            interestRate={inputs.interestRate}
            loanTenure={inputs.loanTenure}
            currency={currency}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
