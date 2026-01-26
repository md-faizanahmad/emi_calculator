"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Result from "./SalaryResult";
import {
  LoanInputs,
  LoanOutput,
  ValidationErrors,
  calculateLoanDetails,
  validateInputs,
} from "@/utils/salaryutils";
import { LoanHeader } from "../comman/LoanHeader";

const inputVariants = {
  focus: { scale: 1.01, transition: { duration: 0.2 } },
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    <div className="bg-white min-h-screen">
      <LoanHeader />
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-black">
        <div className="max-w-4xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Monthly Salary */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <label
                  htmlFor="monthlySalary"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Monthly Salary ({currency === "INR" ? "₹" : "$"})
                </label>
                <input
                  type="number"
                  name="monthlySalary"
                  id="monthlySalary"
                  value={inputs.monthlySalary}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white text-black border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                {errors.monthlySalary && (
                  <p className="text-red-600 text-xs mt-1 font-medium">
                    {errors.monthlySalary}
                  </p>
                )}
                <p className="text-[11px] text-zinc-500 mt-1.5 font-medium">
                  Net monthly take-home income.
                </p>
              </motion.div>

              {/* Interest Rate */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <label
                  htmlFor="interestRate"
                  className="block text-sm font-bold text-black mb-2"
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
                  className="w-full p-3 rounded-xl bg-white text-black border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                {errors.interestRate && (
                  <p className="text-red-600 text-xs mt-1 font-medium">
                    {errors.interestRate}
                  </p>
                )}
                <p className="text-[11px] text-zinc-500 mt-1.5 font-medium">
                  Typical rates: 8% to 15%.
                </p>
              </motion.div>

              {/* Desired EMI */}
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                className="sm:col-span-1"
              >
                <label
                  htmlFor="desiredEmi"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Desired Monthly EMI ({currency === "INR" ? "₹" : "$"})
                </label>
                <input
                  type="number"
                  name="desiredEmi"
                  id="desiredEmi"
                  value={inputs.desiredEmi}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white text-black border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                {errors.desiredEmi && (
                  <p className="text-red-600 text-xs mt-1 font-medium">
                    {errors.desiredEmi}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[5000, 10000, 15000].map((emi) => (
                    <button
                      key={emi}
                      type="button"
                      onClick={() => handlePresetEmi(emi)}
                      className="px-3 py-1 text-xs font-bold border border-zinc-200 rounded-full hover:bg-zinc-100 transition-colors text-black"
                    >
                      {currency === "INR" ? "₹" : "$"}
                      {emi.toLocaleString()}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Loan Tenure */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <label
                  htmlFor="loanTenure"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Loan Tenure (Years)
                </label>
                <select
                  name="loanTenure"
                  id="loanTenure"
                  value={inputs.loanTenure}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white text-black border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 5, 7, 10].map((year) => (
                    <option key={year} value={year}>
                      {year} {year === 1 ? "Year" : "Years"}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-zinc-500 mt-1.5 font-medium">
                  Total repayment duration.
                </p>
              </motion.div>

              {/* Down Payment */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <label
                  htmlFor="downPaymentPercentage"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Down Payment (%)
                </label>
                <input
                  type="number"
                  name="downPaymentPercentage"
                  id="downPaymentPercentage"
                  value={inputs.downPaymentPercentage}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl bg-white text-black border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                <p className="text-[11px] text-zinc-500 mt-1.5 font-medium">
                  Percentage you pay upfront (0-50%).
                </p>
              </motion.div>
            </form>

            <hr className="my-8 border-zinc-100" />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 text-sm font-bold text-black border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all active:scale-95"
              >
                Reset
              </button>
              <button
                onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
                className="px-5 py-2.5 text-sm font-bold text-black border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all active:scale-95"
              >
                {currency === "INR" ? "Switch to USD" : "Switch to INR"}
              </button>
              <button
                onClick={() => setShowTips(!showTips)}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all active:scale-95 ${
                  showTips
                    ? "bg-black text-white"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {showTips ? "Hide Tips" : "Affordability Tips"}
              </button>
            </div>

            {/* Tips Section */}
            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h3 className="text-sm font-bold text-black mb-3 text-center">
                      Loan Affordability Guide
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Keep EMI below 40% of salary.",
                        "Longer tenure reduces EMI but costs more interest.",
                        "20-30% down payment is ideal.",
                        "Check credit score for better rates.",
                      ].map((tip, i) => (
                        <li
                          key={i}
                          className="text-xs text-zinc-700 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Section */}
          <div className="mt-8">
            <Result
              result={result}
              monthlySalary={inputs.monthlySalary}
              interestRate={inputs.interestRate}
              loanTenure={inputs.loanTenure}
              currency={currency}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
